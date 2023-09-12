import axios from 'axios';
import {Diagnosis} from "../types"
import { apiBaseUrl } from '../constants'; //"3001/api"

const allEntries = async()=>{
    const{data} = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses/all`)
    return data
}

const exportedObject = {
  allEntries,
};

export default exportedObject;

