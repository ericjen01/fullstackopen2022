import express from "express";
import diagnosesRouter from "./routes/diagnoses";
import patientsRouter from './routes/patients';
import entriesRouter from './routes/entries';

const app = express();
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-var-requires
const cors = require('cors');
const PORT = 3001;
app.use(express.json());
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());

app.get("/api", () => {});
app.use("/api/diagnoses", diagnosesRouter); 
app.use("/api/patients", patientsRouter);
app.use("/api/patients", entriesRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

