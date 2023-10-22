import axios from 'axios';
import {BaseEntry} from "../types"
import { apiBaseUrl } from '../constants'; //"3001/api"

const specialists = async() => {
    const{data} = await axios.get<BaseEntry["specialist"][]>(`${apiBaseUrl}/specialists`)
    return data;
}

const exportedObject = {
  specialists,
};

export default exportedObject;

