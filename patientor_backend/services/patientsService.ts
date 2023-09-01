import patientEntries from "../data/patientEntries";
import {PatientEntry, NewPatientEntry, /*NoSsnPatientEntry, Gender*/} from "../types";
import { v4 as uuidv4 } from 'uuid';

const allEntries=():PatientEntry[]=>{
    //console.log(patientEntries);
    return patientEntries;
};

const addPatient =(entry:NewPatientEntry/*no id*/):PatientEntry/*full data*/=>{
    const newPatientEntry= {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
        id: uuidv4(),
        ...entry    };

    patientEntries.push(newPatientEntry);
    return newPatientEntry;
};

export default {allEntries, addPatient};




