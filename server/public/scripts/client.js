/**
 * This is needed to get these types to resolve
 * I dunno why, getting types for this project has been janky
 *
 * @typedef {("+" | "-" | "*" | "/")} Operator
 *
 * @typedef {Object} CalculationRequest
 * @property {(number|string)} numOne
 * @property {(number|string)} numTwo
 * @property {Operator} operator
 *
 * @typedef {Object} Calculation
 * @property {(number|string)} numOne
 * @property {(number|string)} numTwo
 * @property {Operator} operator
 * @property {number} result
 */

/**
 * Obtains history of calculations from the server
 */
function getHistory() {
  axios({ method: "GET", url: "/calculations" }).then((res) => {
    // Using console.debug because console.log is hidden
    // and IMO having logs in the console is helpful
    /** @type {Calculation[]} */
    const history = res.data
    console.debug("history:", history)
    if (history.length) {
      renderResult(history.at(-1).result)
      for (const calculation of history) {
        renderHistory(calculation)
      }
    }
  })
}

/**
 * Renders the result of the last calculation to the DOM
 * @param {number} n The result of the last calculation
 */
function renderResult(n) {
  /** @type {HTMLElement} */
  const result = document.querySelector("section#results")
  result.textContent = n
}

/**
 * Renders a history item to the DOM
 * @param {Calculation} calculation A calculation object
 */
function renderHistory(calculation) {
  /** @type {HTMLElement} */
  const history = document.querySelector("section#history")
  const li = document.createElement("li")
  li.textContent = `${calculation.numOne} ${calculation.operator} ${calculation.numTwo} = ${calculation.result}`
  history.appendChild(li)
}

getHistory()

/** @type {HTMLFormElement} */
const calculator = document.querySelector("form#calculator")
calculator.addEventListener("submit", (e) => {
  e.preventDefault()
  console.log(e)
  // Found this by accident while looking at MDN
  const formData = new FormData(calculator)
  console.log(formData)
  const numOne = Number(formData.get("numOne"))
  const numTwo = Number(formData.get("numTwo"))
  if (operator) {
    const data = { numOne, numTwo, operator }
    console.log(data)
    axios({
      method: "POST",
      url: "/calculations",
      data,
    }).then(() => {
      getHistory()
      operator = null
    })
  }
})

// Would prefer if the buttons were radio buttons so this was less janky
// This works but it's I don't like it
/** @type {(Operator|null)} */
let operator = null
document
  .querySelector("button#addition")
  .addEventListener("click", () => (operator = "+"))
document
  .querySelector("button#subtraction")
  .addEventListener("click", () => (operator = "-"))
document
  .querySelector("button#multiplication")
  .addEventListener("click", () => (operator = "*"))
document
  .querySelector("button#division")
  .addEventListener("click", () => (operator = "/"))

console.log("client.js is sourced!")
