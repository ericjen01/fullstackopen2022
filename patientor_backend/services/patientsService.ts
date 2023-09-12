import {data_Patients, data_newPatients} from "../data/patientEntries";
import {PatientEntry, NewPatientEntry, Patient} from "../types";
import { v4 as uuidv4 } from 'uuid';
//import { useParams } from 'react-router-dom';


const allPatients=():Patient[]=>{
    return data_Patients;
};

const patientById = (id:string):Patient|undefined=>{
    const patient = data_Patients.find(p=>p.id===id);
    return patient;
};


const addPatient =(entry:NewPatientEntry):PatientEntry=>{
    const newPatientEntry= {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
        id: uuidv4(),
        ...entry    };

    data_newPatients.push(newPatientEntry);
    return newPatientEntry;
};

export default {allPatients, addPatient, patientById};




