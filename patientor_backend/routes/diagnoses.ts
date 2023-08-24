import express  from "express";
import diagnosesService from "../services/diagnosesService";

const router = express.Router();

router.get("/simple",(_req,res)=>{
    res.send(diagnosesService.getNonLatinEntries());
});

router.get("/all", (_req,res)=>{
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    res.send(JSON.stringify(diagnosesService.getAllEntries()));
});

export default router;

