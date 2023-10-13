import { data_patients } from "../data/patientEntries";

const entriesByPatientId = (reqstedId:string) => {
    const patientById = data_patients.filter(p=>p.id===reqstedId);
    const currentEntries = patientById.map(e=>{
        return e.entries;
    });
    return currentEntries;
};

export default entriesByPatientId; 

