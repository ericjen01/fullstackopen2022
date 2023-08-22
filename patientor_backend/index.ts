import express from "express";
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json()) //json = middleware function in express which parses reqs with json payloads

const PORT = 3001  

app.get("/api/ping",(req,res)=>{
     res.send('<h3>test</h3>')
     console.log(req.body)
})
app.get("/api/patients",(_req,res)=>{
     res.send('<h3>test</h3>')
})

app.listen(PORT,()=>{console.log(`server running on ${PORT}`)})

