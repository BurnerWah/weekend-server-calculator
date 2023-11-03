// This just has some types shared between the server & client

type Operator = "+" | "-" | "*" | "/"

interface CalculationRequest {
  numOne: number | string
  numTwo: number | string
  operator: Operator
}

interface Calculation {
  numOne: number | string
  numTwo: number | string
  operator: Operator
  result: number
}
