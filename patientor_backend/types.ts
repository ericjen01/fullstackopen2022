export interface Entry{}

export interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: string[];
}

export interface Patient{
    id?: string;
    name: string;
    ssn?: string;
    occupation: string;
    gender: Gender;
    dateOfBirth: string;
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

export interface allEntryType{
    code: string,
    name: string,
    latin: string
}

export type nonLatinEntryType = Omit<allEntryType, 'latin'>;

export enum Gender {
    Male= 'male',
    Female = 'female',
    Other = 'other'
}

export type NewPatientEntry = Omit<PatientEntry, 'id'>;
export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;


