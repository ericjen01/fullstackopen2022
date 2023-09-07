import {data_Patients, data_newPatients} from "../data/patientEntries";
import {PatientEntry, NewPatientEntry, Patient} from "../types";
import { v4 as uuidv4 } from 'uuid';


const allEntries=():Patient[]=>{
    return data_Patients;
};

/*const patientById = ():Patient|undefined=>{
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const id = "d2773822-f723-11e9-8f0b-362b9e155667";
    const patient = data_Patients.find(p=>p.id===id);
    return patient;
};
*/

const addPatient =(entry:NewPatientEntry):PatientEntry=>{
    const newPatientEntry= {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
        id: uuidv4(),
        ...entry    };

    data_newPatients.push(newPatientEntry);
    return newPatientEntry;
};

export default {allEntries, addPatient};




