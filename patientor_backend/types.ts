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

export interface PatientEntry{
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string
}