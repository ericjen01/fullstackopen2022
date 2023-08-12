import express  from "express";
import diaryService from "../services/diaryService";
import toNewDiaryEntry from "../utils"
const router = express.Router()

router.get("/",(_req,res)=>{
    res.send(diaryService.getNonSensitiveEntries())
  //  console.log("* dirayService.getNonSensitiveEntries: ", diaryService.getNonSensitiveEntries )
  //  console.log("* dirayService.getNonSensitiveEntries(): ", diaryService.getNonSensitiveEntries() )
})

router.get("/:id",(req,res)=>{
    const diary = diaryService.findById(Number(req.params.id))
    if(diary){
        res.send(diary)
    }else{
        res.sendStatus(404)
    }
})

router.post('/', (req,res)=>{ //adding a new diary entry
    const {date, weather, visibility, comment} = req.body
    //destructuring diaryService.addDairy {date, weather..ect} allows us to extract multiple pieces of data from an array or object and assign them to their own variables.
    const newDiaryEntry = diaryService.addDiary({date, weather, visibility, comment}) 
    res.json(newDiaryEntry)
})

export default router