import axios from 'axios';
import {Diagnosis} from "../types"
import { apiBaseUrl } from '../constants'; //"3001/api"

const allEntries = async() => {
    const{data} = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses/all`)
    return data
}

const diagnosisCodes = async() => {
  const{data} = await axios.get<Diagnosis["code"][]>(`${apiBaseUrl}/diagnosisCodes`)
  return data
}

const exportedObject = {
  allEntries, diagnosisCodes
};

export default exportedObject;

