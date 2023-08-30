import express from 'express';
import patientEntriesService from "../services/patientsService";

const router = express.Router();

//3001/patients/ + ""
router.get('/', (_req,res)=>{
    res.send(JSON.stringify(patientEntriesService()));
});

export default router;


