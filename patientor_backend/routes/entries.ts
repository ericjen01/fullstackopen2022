import express from 'express';
import treatmentService from '../services/entryService';
import { toNewTreatmentEntry } from '../utils';

const router = express.Router();
router.get("/:id/entries", (req,res)=>{
    const reqstedId = req.params.id;
    res.send(treatmentService.entriesByPatientId(reqstedId));
});

router.post("/:id/entries", (req,res)=>{
    try{
        const screenednNewEntry = toNewTreatmentEntry(req.body);
        const newEntryWithId = treatmentService.addNewTreatmentId(screenednNewEntry)
        res.json(newEntryWithId);
    }catch(err:unknown){
        let errorMessage = 'Error Message: (backend>routes>patients). ';
        if (err instanceof Error){
            errorMessage +=  err.message;
        }res.status(400).send(errorMessage);
    }
});

export default router;
