interface BmiValues {
  height: number;
  weight: number;
}

const parseArguments = (args: string[]): BmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const calculateBmi = (height: number, weight: number): string => {
  // BMI: bosy mass (kg) divided by square of height (m)
  const result = weight / Math.pow(height / 100, 2);
  //console.log(`BMI value is ${result}`)
  if (result < 18.5) { // under 18.5
    return 'Underweight';
  }
  else if (result <= 24.9) { // 18.5-24.9
    return 'Normal range';
  }
  else if (result <= 29.9) { // 25-29.9
    return 'Overweight';
  }
  else if (result >= 30) { // over 30
    return 'Obese';
  }
  else {
    throw new Error('An error happened');
  }
};

try {
  if (require.main === module) {
    const { height, weight } = parseArguments(process.argv);
    console.log(calculateBmi(height, weight));
  } else {
    //console.log('bmiCalculator was not run directly from command line')
  }
} catch (error: unknown) {
  let errorMessage = 'Something went wrong: ';
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}
