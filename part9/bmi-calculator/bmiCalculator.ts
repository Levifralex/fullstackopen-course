interface PersonInfo {
  height: number
  weight: number
}

const parseArguments = (args: string[]): PersonInfo => {
  if (args.length < 4) throw new Error("Not enough arguments")
  if (args.length > 4) throw new Error("Too many arguments")

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    }
  } else {
    throw new Error("Provided values were not numbers!")
  }
}

const resultBmi = (bmi: number): string => {
  let message = ""
  switch (true) {
    case bmi < 16:
      message = "Underweight (Severe thinness)"
      break
    case bmi >= 16 && bmi <= 16.9:
      message = "Underweight (Moderate thinness)"
      break
    case bmi >= 17 && bmi <= 18.4:
      message = "Underweight (Mild thinness)"
      break
    case bmi >= 18.5 && bmi <= 24.9:
      message = "Normal (healthy weight)"
      break
    case bmi >= 25.0 && bmi <= 29.9:
      message = "Overweight (Pre-obese)"
      break
    case bmi >= 30.0 && bmi <= 34.9:
      message = "Obese (Class I)"
      break
    case bmi >= 35.0 && bmi <= 39.9:
      message = "Obese (Class II)"
      break
    default:
      message = "Obese (Class III)"
      break
  }
  return message
}

const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / Math.pow(height * 0.01, 2)
  return resultBmi(bmi)
}

try {
  const { height, weight } = parseArguments(process.argv)
  console.log(calculateBmi(height, weight))
} catch (error: unknown) {
  let errorMessage = "Something bad happened."
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message
  }
  console.log(errorMessage)
}

export default calculateBmi
