import express  from "express";
import { Diagnosis } from "../types";
import diagnosesService from "../services/diagnosesService";

const router = express.Router();

router.get("/", (_req,res) => {
    res.send(diagnosesService.getDiagnosisCodes() as [Diagnosis["code"]]);
});

export default router;

