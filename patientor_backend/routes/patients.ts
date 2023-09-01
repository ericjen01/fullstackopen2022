import express from 'express';
import patientService from "../services/patientsService";
//import {PatientEntry/*, NoSsnPatientEntry, Gender*/} from "../types";
import { toNewPatientEntry } from '../utils';

const router = express.Router();

//3001/api/patients/ + ""
router.get('/', (_req,res)=>{
    // use JSON.stringify or OBject.values to get the rid of the error "The first argument must be of type string "
    res.send(JSON.stringify(patientService.allEntries()));
});

router.post("/",(req,res)=>{
    console.log("**** backend>routes>patients>req.body: ", req.body);
try{
    const screenedPatientEntry1 = toNewPatientEntry(req.body);
    const fullPatientEntryWithId= patientService.addPatient(screenedPatientEntry1);

    res.json(fullPatientEntryWithId);
    }catch (err:unknown){
        let errorMessage = 'something is wrong (backend>routes>patients). ';
        if (err instanceof Error){
            errorMessage += 'Error: ' + err.message;
        }res.status(400).send(errorMessage);
}


});

export default router;


/*
 const newPatientEntry = {
        id: "testing id",
        name: "Matti Luukkainen",
        dateOfBirth: "1971-04-09",
        ssn: "090471-8890",
        gender: "male",
        occupation: "Digital evangelist"
        };
    const screenedPatientEntry = toNewPatientEntry(newPatientEntry);
    console.log("*** screenedPatientEntry: ", screenedPatientEntry);
    const addedEntry = patientService.addPatient(screenedPatientEntry);
    console.log("**** addedEntry: ", addedEntry);
*/

/*

   const fetchedPatientEntry = {
        name: "Matti Luukkainen",
        dateOfBirth: "1971-04-09",
        ssn: "090471-8890",
        gender: "male",
        occupation: "Digital evangelist"
        };
const screenedPatientEntry = toNewPatientEntry(fetchedPatientEntry);
const entrywitId = patientService.addPatient(screenedPatientEntry);

console.log(entrywitId);

   console.log("*** entrywithID: ", entrywitId);
//-----------------------

*/

 /* try{
        const newPatientEntry = toNewPatientEntry(req.body);
        console.log("**** newPatienEntry: ", newPatientEntry);
        const addedEntry = patientService.addPatient(newPatientEntry);
        console.log("**** addedEntry: ", addedEntry);

    res.json(addedEntry);
    }catch (err:unknown){
        let errorMessage = 'something is wrong (backend>routes>patients). ';
        if (err instanceof Error){
            errorMessage += 'Error: ' + err.message;
        }res.status(400).send(errorMessage);
    }
    */