import express from 'express';
import treatmentService from '../services/entryService';

const router = express.Router();
router.get("/:id/entries", (req,res)=>{
    const reqstedId = req.params.id;
    res.send(treatmentService.entriesByPatientId(reqstedId));
});

router.post("/:id/entries", (req,res)=>{
    try{
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const newEntry = req.body;
        const newEntryWithId = treatmentService.addNewTreatmentId(newEntry)
        res.json(newEntryWithId);
        console.log("backend/routes/post/entries>entry success. without id: ", newEntry)
        console.log("backend/routes/post/entries>entry success. with id: ", newEntryWithId)
    }catch(err:unknown){
        let errorMessage = 'something is wrong (backend>routes>patients). ';
        if (err instanceof Error){
            errorMessage += 'Error: ' + err.message;
        }res.status(400).send(errorMessage);
    }
});

export default router;
