interface Result {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

interface Rating {
  score: number
  description: string
}

interface ExerciseInfo {
  exerciseHours: number[]
  targetHours: number
}

const parseArguments = (args: string[]): ExerciseInfo => {
  const exerciseHours: number[] = []
  let targetHours = 0

  if (args.length < 4) throw new Error("Not enough arguments")

  targetHours = Number(args[2])

  args.forEach((element, index) => {
    if (index > 2) {
      if (!isNaN(Number(element))) {
        exerciseHours.push(Number(element))
      } else {
        throw new Error("Provided values were not numbers!")
      }
    }
  })

  return {
    exerciseHours,
    targetHours,
  }
}

const ratingExercisesHours = (
  averageHours: number,
  targetHours: number
): Rating => {
  let objectRating: Rating = {
    score: 0,
    description: "",
  }
  switch (true) {
    case averageHours >= targetHours:
      objectRating = {
        score: 3,
        description: "very good",
      }
      break
    case averageHours >= targetHours / 2 && averageHours < targetHours:
      objectRating = {
        score: 2,
        description: "not too bad but could be better",
      }
      break
    case averageHours < targetHours / 2:
      objectRating = {
        score: 1,
        description: "too bad",
      }
      break
  }
  return objectRating
}

const calculateExercises = (
  exerciseHours: number[],
  targetHours: number
): Result => {
  let periodLength = exerciseHours.length

  let trainingDays = exerciseHours.filter((element) => element > 0).length

  let average =
    exerciseHours.reduce((acum, value) => acum + value, 0) /
    exerciseHours.length

  let success = average >= targetHours

  let { score, description } = ratingExercisesHours(average, targetHours)

  return {
    periodLength,
    trainingDays: trainingDays,
    success,
    rating: score,
    ratingDescription: description,
    target: targetHours,
    average,
  }
}

try {
  const { exerciseHours, targetHours } = parseArguments(process.argv)
  console.log(calculateExercises(exerciseHours, targetHours))
} catch (error) {
  let errorMessage = "Something bad happened."
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message
  }
  console.log(errorMessage)
}

export default {}
