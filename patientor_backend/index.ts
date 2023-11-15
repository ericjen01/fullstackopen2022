import express from "express";
import diagnosesRouter from "./routes/diagnoses";
import patientsRouter from './routes/patients';
import entriesRouter from './routes/entries';
import specialistsRouter from "./routes/specialists";
import diagnosesCodesRouter from './routes/diagnosisCodes'

const app = express();
const cors = require('cors');
const PORT = 3001;
app.use(express.json());
app.use(cors());

app.get("/api", () => {});
app.use("/api/specialists", specialistsRouter);
app.use("/api/diagnoses", diagnosesRouter); 
app.use("/api/diagnosisCodes", diagnosesCodesRouter); 
app.use("/api/patients", patientsRouter);
app.use("/api/patients", entriesRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

