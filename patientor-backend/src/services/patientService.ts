import patients from '../../data/patients';
import { NewPatient, NonSensitivePatient, Patient, Entry, NewEntry } from '../types';
import { v1 as uuid } from 'uuid';

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getPatient = (id: string): Patient | undefined => {
  const patient = patients.find((patient) => patient.id === id);
  return patient;
};

const addPatient = ( patient: NewPatient ): Patient => {
  const id = uuid();
  const newPatient = {
    id: id,
    ...patient
  };
  patients.push(newPatient);
  return newPatient;
};

const addEntry = ( id: string, entry: NewEntry ): Entry => {
  const patient = patients.find((patient) => patient.id === id);
  const idToEntry = uuid();
  const newEntry = {
    id: idToEntry,
    ...entry
  };
  patient?.entries.push(newEntry as Entry);
  return newEntry;
};

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient,
  getPatient,
  addEntry
};