export interface Diagnosis{
    code: string;
    name:string;
    latin?:string;
}

export interface Patient {
    id: string;
    name: string;
    occupation: string;
    gender: Gender;
    ssn?: string;
    dateOfBirth?: string;
    entries?: Entry[];
  }

export interface BaseEntry{
    id?: string;
    date: string;
    specialist: string;
    description: string; 
    diagnosisCodes?: Array<Diagnosis['code']>
}

export interface HospitalEntry extends BaseEntry{
    treatment: TreatmentCategory.Hospital;
    discharge?:{
        date: string;
        criteria: string;
    }
    healthCheckRating?: HealthCheckRating;
    employerName?: string; 
}

interface OccupationalHealthcareEntry extends BaseEntry{
    treatment: TreatmentCategory.OccupationalHealthcare;
    healthCheckRating?: HealthCheckRating;
    employerName?: string;
}

interface HealthCheckEntry extends BaseEntry{
    treatment: TreatmentCategory.HealthCheck
    healthCheckRating?: HealthCheckRating;
    employerName?: string;
}

export enum Gender{
    Male = "male",
    Female = "female",
    Other = "other"
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

export enum TreatmentCategory{
    Hospital = "Hospital",
    OccupationalHealthcare = "OccupationalHealthcare",
    HealthCheck = "HealthCheck"
} 

export type Entry = HealthCheckEntry|HospitalEntry| OccupationalHealthcareEntry;
export type PatientFormValues = Omit<Patient, "id"|"entries">
export type nonLatinEntryType = Omit<Diagnosis, 'latin'>;

// Define special omit for unions
//type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
// Define Entry without the 'id' property
//type EntryWithoutId = UnionOmit<Entry, 'id'>;