import express from 'express';
import patientService from "../services/patientsService";
import { toNewPatientInput } from '../utils';

const router = express.Router();

//3001/api/patients/...
router.get('/', (_req,res)=>{
    res.send(JSON.stringify(patientService.allPatients()))  ;
});

router.get('/:id', (req,res)=>{
    const reqstedId = req.params.id;
    res.send(JSON.stringify(patientService.patientById(reqstedId)));
});

router.post("/",(req,res)=>{ 
try{
  const screenedPatientInput = toNewPatientInput(req.body);
    const fullPatientInputWithId= patientService.addPatient(screenedPatientInput);
    res.json(fullPatientInputWithId);
    }catch (err:unknown){
        let errorMessage = 'something is wrong (backend>routes>patients). ';
        if (err instanceof Error){
            errorMessage += 'Error: ' + err.message;
        }res.status(400).send(errorMessage);
}
});

export default router;
