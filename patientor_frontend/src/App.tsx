import{useState, useEffect} from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, Typography } from '@mui/material';

import {apiBaseUrl } from './constants'
import {Patient} from "./types"

import patientService from "./services/patients";
import PatientListPage from "./components/PatienListPage";


const App =()=>{
  //we use a Type Variable "<Patient[]>" which allows us to capture the type users provide that we can use that info later
  //https://www.typescriptlang.org/docs/handbook/generics.html
  const [patients, setPatients] = useState<Patient[]>([])

  useEffect(() => {
     axios.get(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };
     fetchPatientList();
  }, []);
 
  return(
    <div className="App">
    <Router>
      <Container>
        <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
          Patientor
        </Typography>
        <Button component={Link} to="/" variant="contained" color="primary">
          Home
        </Button>
        <Divider hidden />
        <Routes>
          <Route path="/" element={<PatientListPage patients={patients} setPatients={setPatients} />} />
        </Routes>
      </Container>
    </Router>
  </div>
  )

}

export default App;