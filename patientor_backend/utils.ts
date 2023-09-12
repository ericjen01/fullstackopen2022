import {Diagnosis,nonLatinEntryType,Gender, NewPatientEntry, Patient} from "./types";

const isString = (text:unknown):text is string=>{
    return typeof text==='string'|| text instanceof String;
};

const parseStringObject = (obj: unknown): string =>{
    if(!obj||!isString(obj)){
        throw new Error("incorrect or missing string object: " + obj);
    }
    return obj;
};

const isGender = (param: string): param is Gender=>{
    return Object.values(Gender).map(v=>v.toString()).includes(param);
};
const parseGender = (gender: unknown): Gender => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
  };

export const toNewDiagnosesEntry =(obj:unknown)/*:Diagnosis*/=>{
      //typeguard 1: checks if the parameter object exists and it has the type object
      if ( !obj || typeof obj !== 'object' ) {  
        throw new Error('Incorrect or missing data');
      }
       //typeguard 2: uses the in operator to ensure if the object has all the desired fields
       if ('code' in obj && 'name' in obj && "latin" in obj)  {
            const newEntry: Diagnosis = {
                code: parseStringObject(obj.code),
                name: parseStringObject(obj.name),
                latin: parseStringObject(obj.latin),
            };
            return newEntry;
        }
        else if ('code' in obj && 'name' in obj)  {
            const newEntry: nonLatinEntryType = {
                code: parseStringObject(obj.code),
                name: parseStringObject(obj.name),
            };
            return newEntry;
        }
    throw new Error('Incorrect data: some fields are missing');

};

export const 
toFullPatientEntry = (obj:unknown): Patient =>{
    if (!obj||typeof obj !=='object')  throw new Error ('entry does not exists or is not an object');
    
    if('id'in obj && 'name'in obj && 'dateOfBirth'in obj && 'ssn'in obj && 'gender'in obj && 'occupation'in obj && 'entries'in obj){
        const patient : Patient = {
            id: parseStringObject(obj.id),
            name: parseStringObject(obj.name),
            dateOfBirth: parseStringObject(obj.dateOfBirth),
            ssn: parseStringObject(obj.ssn),
            gender: parseGender(obj.gender),
            occupation: parseStringObject(obj.occupation),
            entries:[]
        }; 
        return patient;
    }  throw new Error('patientor>backend>util>toFullPatientEntry: Incorrect data: some fields are missing');

};

export const toNewPatientEntry = (obj:unknown):NewPatientEntry =>{
    //type guard 1:
    if(!obj || typeof obj !=='object'){
        throw new Error ('incomplete or missing data');
    }
    //type guard 2:
    if ('name'in obj && 'dateOfBirth'in obj && 'ssn'in obj && 'gender'in obj && 'occupation'in obj){
        const newEntry: NewPatientEntry ={
            name: parseStringObject(obj.name),
            dateOfBirth: parseStringObject(obj.dateOfBirth),
            ssn: parseStringObject(obj.ssn),
            gender: parseGender(obj.gender),
            occupation: parseStringObject(obj.occupation)
            
        };
        return newEntry;
    }
    throw new Error('patientor>backend>util>toNewPatientEntry: Incorrect data: some fields are missing');
};

export default {};
