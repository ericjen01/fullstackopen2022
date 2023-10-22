import{useState, useEffect} from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, Typography } from '@mui/material';

import {apiBaseUrl } from './constants'
import {Diagnosis, Patient, BaseEntry} from "./types"

import specialistListService from "./services/specialists"
import SpecialistsPage from "./components/SpecialistsPage"

import patientService from "./services/patients";
import PatientListPage from "./components/PatienListPage";

import diagnoseseService from "./services/diagnoses"
import DiagnosisListPage from "./components/DiagnosesListPage"

import PatientInfoPage from "./components/PatientInfoPage";

const App =()=>{
  
  const [patients, setPatients] = useState<Patient[]>([])
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([])
  const [specialists, setSpecialists] = useState<BaseEntry["specialist"][]>([])

  useEffect(() => {
     axios.get(`${apiBaseUrl}`);  //http://localhost:3001/api'

     const fetchSpecialistList = async () => {
      const specialists = await specialistListService.specialists();
      setSpecialists(specialists);
     }
     fetchSpecialistList();

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };
    fetchPatientList();

    const fetchDiagnoseList = async () => {
      //localhost:3001/api/diagnoses/all under 'diagnoseseService.allEntries()'
      const diagnoses = await diagnoseseService.allEntries() 
      setDiagnoses(diagnoses)
    }
    fetchDiagnoseList()

    
  }, []);
 
  return(
    <div className="App">
    <Router>
      <Container>
        <Typography variant="h3" style = {{ marginBottom: "0.5em" }}>
          Patientor
        </Typography>
        <Button component={Link} to = "/" variant = "contained" color = "primary">
          Home
        </Button> 
        <Divider hidden />
        <Routes>
          <Route path = "/" element = {<PatientListPage patients = {patients} setPatients={setPatients}/>} />
          <Route path = "/diagnoses/all" element = {<DiagnosisListPage diagnoses = {diagnoses}/>}/>
          <Route path = "/patients/:id" element = {<PatientInfoPage patients = {patients} setPatients = {setPatients} diagnoses = {diagnoses}/>} />
          <Route path = "/specialists" element = {<SpecialistsPage specialists = {specialists}/>}/>
        </Routes>
      </Container>
    </Router>
  </div>
  )
}

export default App;