interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

interface InputValues {
  targetHour: number;
  exerciseHoursArray: number[];
}

const parseExerciseArguments = (args: string[]): InputValues => {
  if (args.length < 4) throw new Error('Not enough arguments');

  if(!isNaN(Number(args[2]))) {
    const exerciseArray = [];
    for (let i = 3; i < args.length; i++) {
      if(!isNaN(Number(args[i]))) {
        exerciseArray.push(Number(args[i]));
      } else {
        throw new Error('Provided values were not numbers');
      }
    }
    return {
      targetHour: Number(args[2]),
      exerciseHoursArray: exerciseArray
    };
  } else {
    throw new Error('Provided values were not numbers');
  }
};

export const calculateExercises = (exerciseHours: number[], targetHours: number): Result => {
  const numberOfDays = exerciseHours.length;
  const numberOfTrainingDays = exerciseHours.filter((i) => i > 0).length;
  const targetValue = targetHours;
  const averageTime = exerciseHours.reduce((acc, currentValue) => {
    return acc + currentValue;
  }, 0) / numberOfDays;
  const isTargetReached = averageTime >= targetValue;
  let rating = 0;
  let textRating = '';
  if (averageTime < targetValue - 0.5) {
    rating = 1;
    textRating = "target was not reached, you can do better";
  }
  else if (averageTime > targetValue) {
    rating = 3;
    textRating = "target was reached, good job!";
  }
  else {
    rating = 2;
    textRating = "target was almost reached, not too bad";
  }

  const result: Result = {
    periodLength: numberOfDays,
    trainingDays: numberOfTrainingDays,
    success: isTargetReached,
    rating: rating,
    ratingDescription: textRating,
    target: targetHours,
    average: averageTime
  };

  return result;
};

try {
  if (require.main === module) {
    const { targetHour, exerciseHoursArray } = parseExerciseArguments(process.argv);
    console.log(calculateExercises(exerciseHoursArray, targetHour));
  }
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
