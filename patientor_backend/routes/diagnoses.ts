import express  from "express";
import { nonLatinEntryType, Diagnosis} from "../types";
import diagnosesService from "../services/diagnosesService";

const router = express.Router();

// 30001/api/diagnoses + /simple
router.get("/simple",(_req,res)=>{ 
    res.send(JSON.stringify(diagnosesService.getNonLatinEntries() as nonLatinEntryType[]));
});

// 30001/api/diagnoses + /all
router.get("/all", (_req,res)=>{
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    res.send(JSON.stringify(diagnosesService.getAllDiagnoses() as Diagnosis[]));
});

export default router;

