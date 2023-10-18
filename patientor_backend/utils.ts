import {Diagnosis, Entry, Gender, Patient, TreatmentCategory,  HealthCheckRating, Discharge, SickLeave, HospitalEntry, HealthCheckEntry, OccupationalHealthcareEntry} from "./types";

const isNumber = (input: unknown): input is number =>(typeof input === 'number' || input instanceof Number);

const isString = (input:unknown): input is string=> (typeof input === 'string'|| input instanceof String);

const isGender = (input: string): input is Gender => (Object.values(Gender).map(v=>v.toString()).includes(input));

const isTreatmentCategory = (param: string): param is Entry["treatment"] => (Object.values(TreatmentCategory).map(v=>v.toString()).includes(param));

const isDate = (param: string): boolean => (Boolean(Date.parse(param)));

const isHealthCheckRating = (param: number): param is HealthCheckRating => (Object.values(HealthCheckRating).includes(param));


const parseStringObject = (item: unknown): string =>{
    if(!item||!isString(item)){
        throw new Error("incorrect or missing string object: " + item);
    }
    return item;
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};

const parseTreatmentCategory = (category: unknown): ("Hospital" | "OccupationalHealthcare" |"HealthCheck") =>{
    if(!category || !isString(category) || !isTreatmentCategory(category)){
        throw new Error('Incorrect or missing treatment category: ' + category);
    }
    return category;
};

const parseDate = (date: unknown): string =>{
    if(!date || !isString(date) || !isDate(date)){
        throw new Error("incorrect or missing date info: " + date);
    }
    return date;
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
    if((!rating && rating !==0 ) || !isNumber(rating) || !isHealthCheckRating(rating)) throw new Error ("incorrect or missing health check rating: " + rating);
    return rating;
};

const parseEmployerName = (param: unknown): string =>{
    if(!param || !isString(param)) throw new Error ("incorrect or missing Employer Name: " + param);
    return param;
};



export const toNewDiagnosesEntry = (entry: unknown):Diagnosis => {
    if(!entry || typeof entry !== "object"){
        throw new Error("Error in new diagnose entry: entry doesn't exists or is not an object type");
    }
    if("code" in entry && "name" in entry){
        const diagEntry : Diagnosis = {
            code: parseStringObject(entry.code),
            name: parseStringObject(entry.name),
        };
        if("latin" in entry) 
        diagEntry['latin']= parseStringObject(entry.latin);
        return diagEntry;
    }throw new Error('Error in diagnoses entry: Incorrect data: some fields are missing');
};

const toDischarge = (obj: unknown): Discharge => {
    if(!obj || typeof obj !== 'object') throw new Error ("incorrect or missing discharge info as an object: " + obj);
    if("date" in obj && "criteria" in obj){
        const discharge : Discharge = {
            date : parseDate (obj.date),
            criteria : parseStringObject (obj.criteria)
        };
        return discharge;
    }throw new Error("incorrect or missing discharge info/data: " + Object.values(obj));
};

const toSickLeave = (obj: unknown): SickLeave =>{
    if(!obj || typeof obj !== 'object') throw new Error ("incorrect or missing sick leave intfo/data: " + obj);
    if("startDate" in obj && "endDate" in obj){
        const sickLeave : SickLeave ={
            startDate: parseDate(obj.startDate),
            endDate: parseDate(obj.endDate),
        };
        return sickLeave;
    }throw new Error("incorrect or missing sickleave info/data: " + Object.values(obj));
};

const toHospitalEntry = (obj: Entry): HospitalEntry => (obj);
const toOccupationalHealthcareEntry = (obj: Entry): OccupationalHealthcareEntry => (obj);
const toHealthCheckEntry = (obj: Entry): HealthCheckEntry => (obj);

const parseDiagnosesCode = (param: unknown): Diagnosis["code"] =>{
    if(!param || typeof param !== "string")throw new Error("Error in new diagnose code: code doesn't exists or is not a correct type");
    return param;
};

const toTreatmentEntry = (obj:unknown): Entry => {
    if (!obj||typeof obj !=='object')  throw new Error ('utils>treatment does not exists or is not an object');
    const objValues = obj;
    if("id" in objValues &&
    "date" in objValues &&
    "specialist" in objValues &&
    "description" in objValues &&
    "treatment" in objValues){
        const entry :Entry ={
            id: parseStringObject(objValues.id),
            date: parseStringObject(objValues.date),
            specialist: parseStringObject(objValues.specialist),
            description: parseStringObject(objValues.description),
            treatment: parseTreatmentCategory(objValues.treatment),
        }; 
        if('diagnosisCodes' in objValues){
            (objValues.diagnosisCodes as string[]).map(d => (parseDiagnosesCode(d)));
        }
        if('discharge' in objValues){
          toHospitalEntry(entry).discharge = toDischarge(objValues.discharge);
        }
        if('sickLeave' in objValues && 'employerName' in objValues){
            toOccupationalHealthcareEntry(entry).sickLeave = toSickLeave(objValues.sickLeave);
            toOccupationalHealthcareEntry(entry).employerName = parseEmployerName(objValues.employerName);
        }
        if('healthCheckRating' in objValues){
            toHealthCheckEntry(entry).healthCheckRating = parseHealthCheckRating(objValues.healthCheckRating);
        }
        return entry; 
    }throw new Error ("Error in treatment entry: incorrect or missing treatment data");
};

export const 
toFullPatientEntry = (obj:unknown): Patient =>{
    if (!obj||typeof obj !=='object')  throw new Error ('** entry does not exists or is not an object');
    if('id'in obj && 'name'in obj && 'dateOfBirth'in obj && 'ssn'in obj && 'gender'in obj && 'occupation'in obj){
        const patient : Patient = {
            id: parseStringObject(obj.id),
            name: parseStringObject(obj.name),
            dateOfBirth: parseStringObject(obj.dateOfBirth),
            ssn: parseStringObject(obj.ssn),
            gender: parseGender(obj.gender),
            occupation: parseStringObject(obj.occupation),
        }; 
        if('entries' in obj && Object.keys(obj.entries as Entry).length !== 0){
            patient['entries'] = Object.values(obj.entries as Entry).map(e => toTreatmentEntry(e));
        }
        return patient;
    }  throw new Error('Incorrect data in full patient history: some fields are missing');
};

export const toNewPatientEntry = (obj:unknown):Patient =>{
    if(!obj || typeof obj !=='object'){ throw new Error ('toNewPatientEntry: incomplete or missing data'); }
    if ('name'in obj && 'dateOfBirth'in obj && 'ssn'in obj && 'gender'in obj && 'occupation'in obj){
        const newEntry: Patient ={
            name: parseStringObject(obj.name),
            dateOfBirth: parseStringObject(obj.dateOfBirth),
            ssn: parseStringObject(obj.ssn),
            gender: parseGender(obj.gender),
            occupation: parseStringObject(obj.occupation)
        };
        return newEntry;
    }
    throw new Error('Incorrect data in new patient entry: some fields are missing');
};
export default {};
