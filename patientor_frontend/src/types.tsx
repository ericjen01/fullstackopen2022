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
    discharge?: Discharge
}

interface OccupationalHealthcareEntry extends BaseEntry{
    treatment: TreatmentCategory.OccupationalHealthcare;
    employerName?: string;
    sickLeave?: SickLeave
}

interface HealthCheckEntry extends BaseEntry{
    treatment: TreatmentCategory.HealthCheck
    healthCheckRating: HealthCheckRating;
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

export interface Discharge {
    date: string;
    criteria: string;
}

export interface SickLeave {
    startDate: string;
    endDate: string;
}

export type Entry = HealthCheckEntry|HospitalEntry| OccupationalHealthcareEntry;
export type PatientFormValues = Omit<Patient, "id"|"entries">
export type nonLatinEntryType = Omit<Diagnosis, 'latin'>;

