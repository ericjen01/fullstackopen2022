import express from 'express';
import patientService from "../services/patientsService";
//import {PatientEntry/*, NoSsnPatientEntry, Gender*/} from "../types";
import { toNewPatientEntry } from '../utils';

const router = express.Router();

//3001/api/patients/ + ""
router.get('/', (_req,res)=>{
    res.send(JSON.stringify(patientService.allEntries()))  ;
});

/*router.get('/:id', (_req,res)=>{
    res.send(JSON.stringify(patientService.patientById()));
});*/

router.post("/",(req,res)=>{
try{
    const screenedPatientEntry = toNewPatientEntry(req.body);
    const fullPatientEntryWithId= patientService.addPatient(screenedPatientEntry);

    res.json(fullPatientEntryWithId);
    }catch (err:unknown){
        let errorMessage = 'something is wrong (backend>routes>patients). ';
        if (err instanceof Error){
            errorMessage += 'Error: ' + err.message;
        }res.status(400).send(errorMessage);
}


});

export default router;