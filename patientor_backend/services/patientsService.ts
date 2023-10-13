import {data_patients} from "../data/patientEntries";
import { Patient} from "../types";
import { v4 as uuidv4 } from 'uuid';


const allPatients=():Patient[]=>{
    return data_patients;
};

const patientById = (id:string):Patient|undefined=>{
    const patient = data_patients.find(p=>p.id===id);
    return patient;
}; 

const addPatient =(entry:Patient):Patient=>{
    const newPatientEntry= {
        id: uuidv4(),
        ...entry    };
    return newPatientEntry;
};

export default {allPatients, addPatient, patientById};




