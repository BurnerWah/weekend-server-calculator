// This just has some types shared between the server & client

interface CalculationRequest {
  numOne: number
  numTwo: number
  operator: "+" | "-" | "*" | "/"
}

interface Calculation extends CalculationRequest {
  result: number
}
