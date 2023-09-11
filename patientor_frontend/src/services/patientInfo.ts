import axios from 'axios';
import {Patient} from "../types";
import { apiBaseUrl } from "../constants";

const getAll = async(patientId:string|unknown)=>{
  
    const {data} = await axios.get<Patient>(`${apiBaseUrl}/patients/${patientId}`)
    return data
}

export default getAll



