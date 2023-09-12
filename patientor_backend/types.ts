/*------------patient related-------------*/
export interface Patient{
    id?: string;
    name: string;
    dateOfBirth: string;
    ssn?: string;
    gender: Gender;
    occupation: string;
    entries?: Entry[]
}
 
export interface PatientEntry{
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string
}

export type NewPatientEntry = Omit<PatientEntry, 'id'>;
export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;

/*------------diagnosis related-------------*/
export interface Diagnosis{
    code: string;
    name: string;
    latin: string;
}

export enum Gender {
    Male= 'male',
    Female = 'female',
    Other = 'other'
}

export type nonLatinEntryType = Omit<Diagnosis, 'latin'>;

/*------------advanced entry related-------------*/
export interface BaseEntry {
    id: string;
    date: string;
    specialist: string;
    description: string;
    diagnosisCodes?: Diagnosis['code'][];
   // diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum CareType{
    HealthCheck= "HealthCheck",
    OccupationalHealthcare= "OccupationalHealthcare",
    Hospital = "Hospital"
}

export enum healthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

interface HospitalEntry extends BaseEntry{
    type: string;
    discharge?: {
      date: string;
      criteria: string;
    }
  }

interface OccupationalHealthcareEntry extends BaseEntry{
    type: string;
    employerName: string;
    healthCheckRating?: healthCheckRating;
    sickLeave?: {
        startDate: string;
        endDate: string;
    }
}

interface HealthCheckEntry extends BaseEntry{
    type: CareType;
    healthCheckRating?: HealthCheckEntry;
}

export type Entry = |HealthCheckEntry|HospitalEntry| OccupationalHealthcareEntry;
