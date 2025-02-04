import express from 'express';
import cors from 'cors';
import diagnosisRouter from './routes/diagnoses';
import patientRouter from './routes/patients';

const allowedOrigins = ['http://localhost:5173'];
const options: cors.CorsOptions = {
  origin: allowedOrigins
};

const app = express();
app.use(cors(options));
app.use(express.json());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diagnoses', diagnosisRouter);

app.use('/api/patients', patientRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});