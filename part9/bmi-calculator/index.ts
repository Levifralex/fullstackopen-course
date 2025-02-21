import express from "express"
import calculateBmi from "./bmiCalculator"
const app = express()

app.get("/ping", (_req, res) => {
  res.send("pong")
})

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!")
})

app.get("/bmi", (req, res) => {
  const height: number = Number(req.query.height)
  const weight: number = Number(req.query.weight)

  if (!height || !weight) {
    res.status(400)
    res.send({
      error: "malformatted parameters",
    })
  }

  const bmi: string = calculateBmi(height, weight)

  res.send({
    weight,
    height,
    bmi,
  })
})

const PORT = 3003

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
