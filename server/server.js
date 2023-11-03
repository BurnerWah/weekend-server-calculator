const express = require("express")
const app = express()
let PORT = process.env.PORT || 5000

app.use(express.json())
app.use(express.static("server/public"))

// Global variable that will contain all of the
// calculation objects:
/** @type {Calculation[]} */
let calculations = []

// Here's a wonderful place to make some routes:

// GET /calculations
app.get("/calculations", (req, res) => {
  res.send(calculations)
})

// POST /calculations
app.post("/calculations", (req, res) => {
  /** @type {CalculationRequest} */
  const calc = req.body
  console.log(calc)

  /** @type {Calculation} */
  const result = {
    result: calculate(Number(calc.numOne), calc.operator, Number(calc.numTwo)),
    ...calc,
  }
  console.log(result)

  calculations.push(result)
  console.log(calculations)

  res.sendStatus(201)
})

/**
 * Calculates a result based on two numbers and an operator
 * @param {number} left Left hand number
 * @param {Operator} operator The operation to perform
 * @param {number} right Right hand number
 * @returns {number} The result of the calculation
 */
function calculate(left, operator, right) {
  console.log(left, operator, right)
  switch (operator) {
    case "+":
      return left + right
    case "-":
      return left - right
    case "*":
      return left * right
    case "/":
      return left / right
    default:
      throw new Error(`Unknown operator: ${operator}`)
  }
}

// PLEASE DO NOT MODIFY ANY CODE BELOW THESE BEARS:
// 🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸

// Makes it so you don't have to kill the server
// on 5000 in order to run the tests:
if (process.env.NODE_ENV === "test") {
  PORT = 5001
}

// This starts the server...but also stores it in a variable.
// This is weird. We have to do it for testing reasons. There
// is absolutely no need for you to reason about this.
const server = app.listen(PORT, () => {
  console.log("server running on: ", PORT)
})

// server.setTimeout(500)

// This is more weird "for testing reasons" code. There is
// absolutely no need for you to reason about this.
app.closeServer = () => {
  server.close()
}

app.setCalculations = (calculationsToSet) => {
  calculations = calculationsToSet
}

module.exports = app
