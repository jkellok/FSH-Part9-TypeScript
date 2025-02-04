import express from 'express';
const app = express();
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;
  if (height && weight) {
    if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
      const bmi = calculateBmi(Number(height), Number(weight));
      res.json({
        height: Number(height),
        weight: Number(weight),
        bmi: bmi
      });
    } else {
      res.status(400).json({error: 'Provided values were not numbers'});
    }
  } else {
    res.status(400).json({error: 'malformatted parameters'});
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  if ( !daily_exercises || !target ) {
    res.status(400).send({ error: 'parameters missing' });
  } else {
    /* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,
      @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-call,
      @typescript-eslint/no-unsafe-member-access */
    const arrayHasNumbers: boolean = daily_exercises.every((item: any) => {
      return typeof item === 'number';
    });
    if (isNaN(Number(target)) || !arrayHasNumbers) {
      res.status(400).send({ error: 'malformatted parameters' });
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const result = calculateExercises(daily_exercises, Number(target));
      res.send({ result });
    }
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});