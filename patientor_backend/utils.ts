import {allEntryType,nonLatinEntryType} from "./types";

const isString = (text:unknown):text is string=>{
    return typeof text==='string'|| text instanceof String;
};

const parseStringObject = (obj: unknown): string =>{
    if(!obj||!isString(obj)){
        throw new Error("incorrect or missing object: " + obj);
    }
    return obj;
};


const toNewDiagnosesEntry =(obj:unknown)/*:allEntryType*/=>{
      //typeguard 1: checks if the parameter object exists and it has the type object
      if ( !obj || typeof obj !== 'object' ) {  
        throw new Error('Incorrect or missing data');
      }
       //typeguard 2: uses the in operator to ensure if the object has all the desired fields
       if ('code' in obj && 'name' in obj && "latin" in obj)  {
            const newEntry: allEntryType = {
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


export default toNewDiagnosesEntry;
