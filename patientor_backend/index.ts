import express from "express";
import diagnosesRouter from "./routes/diagnoses";
import allEntries from "./data/diagnosesEntries";
//import diagnosesService from "./services/diagnosesService";


const app = express();
const PORT = 3001;
app.use(express.json());

app.get("/test", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});
app.use("/api/diagnoses", diagnosesRouter);

console.log(allEntries);
//console.log(diagnosesService.getAllEntries());

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

