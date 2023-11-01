import axios from 'axios';
import {Patient, PatientFormValues} from "../types"

import { apiBaseUrl } from '../constants';

const getAll = async()=>{
    const{data} = await axios.get<Patient[]>(`${apiBaseUrl}/patients`)
    return data
}

const create = async (object: PatientFormValues) => {
    const { data } = await axios.post<Patient>( `${apiBaseUrl}/patients`, object );
    console.log("frontend>services>createuser>object: ", object)
    console.log("frontend>services>createuser>data: ", data)
    return data;
};

const exportedObject={
  getAll, create
}

// eslint-disable-next-line import/no-anonymous-default-export
export default exportedObject