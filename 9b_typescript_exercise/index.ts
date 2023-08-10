import express from 'express'
import { calculate } from "./calculator"
const app = express()

app.get('/ping',(_req, res)=>{
    res.send('pong')
})

app.post('/calculate', (req,res)=>{
    const {val1,val2,op}=req.body

    if ( !val1 || isNaN(Number(val1)) ) {
        return res.status(400).send({ error: '...'});
      }

    const result = calculate(Number(val1), Number(val2), op);
  return res.send({ result });
})

const PORT = 3000

app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
})