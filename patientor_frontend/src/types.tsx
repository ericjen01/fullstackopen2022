

export interface Diagnosis{
    code: string;
    name:string;
    latin?:string;
}

export enum Gender{
    male="male",
    Female = "female",
    Other = "other"
}

export interface Patient {
    id: string;
    name: string;
    occupation: string;
    gender: Gender;
    ssn?: string;
    dateOfBirth?: string;
    entries?: Entry[]
  }


export type PatientFormValues = Omit<Patient, "id"|"entries">
export type nonLatinEntryType = Omit<Diagnosis, 'latin'>;


export interface BaseEntry{
    id: string;
    date: string;
    specialist: string;
    description: string; 
    diagnosisCodes?: Array<Diagnosis['code']>
}

interface HospitalEntry extends BaseEntry{
    type: CareType;
    discharge:{
        startDate: string;
        endDate: string;
    }
}

interface OccupationalHealthcareEntry extends BaseEntry{
    type: CareType;
    employerName: string;
}

interface HealthCheckEntry extends BaseEntry{
    type: CareType;
    healthCheckRating: HealthCheckRating;
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

export enum CareType{
    HealthCheck= "HealthCheck",
    OccupationalHealthcare= "OccupationalHealthcare",
    Hospital = "Hospital"
}

export type Entry = |HealthCheckEntry|HospitalEntry| OccupationalHealthcareEntry;
