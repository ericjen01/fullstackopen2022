import { data_patients } from "../data/patientEntries";
import { Entry } from "../types";
import { v4 as uuidv4 } from 'uuid';

const entriesByPatientId = (reqstedId:string) => {
    const patientById = data_patients.filter(p=>p["id"]===reqstedId);
    const currentEntries = patientById.map(e=>{
        return e.entries;
    });
    return currentEntries;
};

const addNewTreatmentId =(entry:Entry):Entry=>{
    const newTreatmentEntry= {
        id: uuidv4(),
        ...entry    };
    return newTreatmentEntry;
};

export default {entriesByPatientId, addNewTreatmentId}; 

