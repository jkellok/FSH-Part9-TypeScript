import { z } from 'zod';
import { Gender, NewPatient, Entry, NewEntry, Diagnosis, HealthCheckRating, Discharge, SickLeave } from './types';

export const newPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
  entries: z.custom<Entry>().array()
});

export const toNewPatient = (object: unknown): NewPatient => {
  return newPatientSchema.parse(object);
};

export const BaseEntrySchema = z.object({
  date: z.string().date(),
  description: z.string(),
  specialist: z.string(),
  diagnosisCodes: z.custom<Diagnosis['code']>().array().optional()
});

const HospitalEntrySchema = BaseEntrySchema.extend({
  type: z.literal('Hospital'),
  discharge: z.custom<Discharge>(),
});

const OccupationalHealthcareEntrySchema = BaseEntrySchema.extend({
  type: z.literal('OccupationalHealthcare'),
  employerName: z.string(),
  sickLeave: z.custom<SickLeave>().optional(),
});

const HealthCheckEntrySchema = BaseEntrySchema.extend({
  type: z.literal('HealthCheck'),
  healthCheckRating: z.nativeEnum(HealthCheckRating),
});

export const newEntrySchema = z.discriminatedUnion("type", [
  HospitalEntrySchema,
  OccupationalHealthcareEntrySchema,
  HealthCheckEntrySchema
]);

export const toNewEntry = (object: unknown): NewEntry => {
  return newEntrySchema.parse(object);
};