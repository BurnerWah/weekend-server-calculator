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
    renderResult(history.at(-1).result)
    for (const calculation of history) {
      renderHistory(calculation)
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

console.log("client.js is sourced!")
