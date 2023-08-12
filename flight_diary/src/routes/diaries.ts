import express  from "express";
const router = express.Router()

router.get("/",(_req,res)=>{
    res.send("Fectching All Diaries")
})

router.post('/', (_req,res)=>{
    res.send('Saving all Diaries')
})

export default router