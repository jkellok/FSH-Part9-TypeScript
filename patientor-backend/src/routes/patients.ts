import express, { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import patientService from '../services/patientService';
import { newPatientSchema, newEntrySchema } from '../utils';
import { NewPatient, Patient, Entry, NewEntry } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatients());
});

router.get('/:id', (req, res) => {
  res.send(patientService.getPatient(req.params.id));
});

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    newPatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    console.log(error);
    next(error);
  }
};

const newEntryParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    newEntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    console.log(error);
    next(error);
  }
};

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
  if (error instanceof z.ZodError) {
    console.log("zoderror", error);
    res.status(400).send({ error: error.issues });
  } else {
    console.log("error middleware", error);
    next(error);
  }
};

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
  const addedPatient = patientService.addPatient(req.body);
  res.json(addedPatient);
});

router.post('/:id/entries', newEntryParser, (req: Request<{id: string}, unknown, NewEntry>, res: Response<Entry>) => {
  const addedEntry = patientService.addEntry(req.params.id, req.body);
  res.json(addedEntry);
});

router.use(errorMiddleware);

export default router;