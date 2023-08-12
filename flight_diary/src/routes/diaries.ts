import express  from "express";
import diaryService from "../services/diaryService";
const router = express.Router()

router.get("/",(_req,res)=>{
    res.send(diaryService.getNonSensitiveEntries())
  //  console.log("* dirayService.getNonSensitiveEntries: ", diaryService.getNonSensitiveEntries )
  //  console.log("* dirayService.getNonSensitiveEntries(): ", diaryService.getNonSensitiveEntries() )
})

router.post('/', (_req,res)=>{
    res.send('Saving all Diaries')
})

export default router