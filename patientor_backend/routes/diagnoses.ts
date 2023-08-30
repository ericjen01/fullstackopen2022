import express  from "express";
import diagnosesService from "../services/diagnosesService";

const router = express.Router();

// 30001/api/diagnoses + /simple
router.get("/simple",(_req,res)=>{
     // use JSON.stringify or OBject.values to get the rid of the error "The first argument must be of type string "
    res.send(JSON.stringify(diagnosesService.getNonLatinEntries()));
});

// 30001/api/diagnoses + /all
router.get("/all", (_req,res)=>{
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
     // use JSON.stringify or OBject.values to get the rid of the error "The first argument must be of type string "
    res.send(JSON.stringify(diagnosesService.getAllEntries()));
});

export default router;

