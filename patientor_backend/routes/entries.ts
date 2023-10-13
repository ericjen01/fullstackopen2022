import express from 'express';
import entriesByPatientId from '../services/entryService';

const router = express.Router();
router.get("/:id/entries", (req,res)=>{
    const reqstedId = req.params.id;
    res.send(entriesByPatientId(reqstedId));
});

router.post("/:id/entries", (req,res)=>{
    try{
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const newEntry = req.body;
        res.json(newEntry);
    }catch(err:unknown){
        let errorMessage = 'something is wrong (backend>routes>patients). ';
        if (err instanceof Error){
            errorMessage += 'Error: ' + err.message;
        }res.status(400).send(errorMessage);
    }
});

export default router;
