import axios from 'axios';
import {Patient, Entry} from "../types";
import { apiBaseUrl } from "../constants";

const getAll = async(patientId:string|unknown)=>{
    const {data} = await axios.get<Patient>(`${apiBaseUrl}/patients/${patientId}`)
    return data
}

const create = async (object:Entry,patientId:string|unknown ) => {
    const { data } = await axios.post<Entry>(`${apiBaseUrl}/patients/${patientId}/entries`,object);
    console.log("frontend>patientInfo.ts>data: ", data)
    return data;
};

const exportedObject={getAll, create}

export default exportedObject



