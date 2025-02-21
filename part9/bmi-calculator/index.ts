import express from "express";
import calculateBmi from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";
const app = express();

app.use(express.json());

app.get("/ping", (_req, res) => {
  res.send("pong");
});

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height: number = Number(req.query.height);
  const weight: number = Number(req.query.weight);

  if (!height || !weight) {
    res.status(400).json({
      error: "malformatted parameters",
    });
    return;
  }

  const bmi: string = calculateBmi(height, weight);

  res.json({
    weight,
    height,
    bmi,
  });
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
app.post("/exercises", (req, res): any => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = req.body;

    if (!daily_exercises) {
      return res.status(400).send({ error: "malformatted parameters" });
    }

    const exercisesArray = daily_exercises as [];
    const dailyExercises: number[] = [];

    exercisesArray.forEach((element) => {
      if (!isNaN(Number(element))) {
        dailyExercises.push(Number(element));
      } else {
        throw new Error("Provided values for daily exercise were not numbers!");
      }
    });

    if (!target || isNaN(Number(target))) {
      return res.status(400).send({ error: "malformatted parameters" });
    }

    const result = calculateExercises(dailyExercises, Number(target));
    res.send({ ...result });
    return;
  } catch (error) {
    let errorMessage = "Something bad happened.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    return res.status(400).send({
      errorMessage,
    });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
