export interface Patient{
    id?: string;
    name: string;
    dateOfBirth: string;
    ssn?: string;
    gender: keyof typeof Gender;
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

export interface Diagnosis{
    code: string;
    name: string;
    latin?: string;
}

type OptionalKeys <T, K extends keyof T > = T extends unknown? Omit<T , K> : never;
export type DiagnosisLatinAsOption = OptionalKeys<Diagnosis, 'latin'>;

export enum Gender {
    male= 'male',
    female = 'female',
    other = 'other'
}

export enum TreatmentCategory{
    Hospital = "Hospital",
    OccupationalHealthcare = "OccupationalHealthcare",
    HealthCheck = "HealthCheck"
}

export interface BaseEntry {
    id: string;
    date: string;
    specialist: string;
    description: string;
    diagnosisCodes?: Diagnosis['code'][];
   // diagnosisCodes?: Array<Diagnosis['code']>;
}

  export interface HospitalEntry extends BaseEntry{
    treatment: keyof typeof TreatmentCategory;
    discharge?:Discharge
  //  healthCheckRating?: keyof typeof HealthCheckRating;
 //   employerName?: string;
}

export interface OccupationalHealthcareEntry extends BaseEntry{
    treatment: keyof typeof TreatmentCategory;
   // healthCheckRating?: HealthCheckRating;
    employerName?: string;
    sickLeave?: SickLeave;
}

export interface HealthCheckEntry extends BaseEntry{
    treatment: keyof typeof TreatmentCategory;
    healthCheckRating?: HealthCheckRating;
    employerName?: string;
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk hmmmm" = 3 
}

export interface Discharge {
    date: string;
    criteria: string;
}

export interface SickLeave {
    startDate: string;
    endDate: string;
  }

export type nonLatinEntryType = Omit<Diagnosis, "latin">;
export type Entry = HealthCheckEntry|HospitalEntry| OccupationalHealthcareEntry;
