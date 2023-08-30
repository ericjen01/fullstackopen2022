import axios from 'axios';
import {Diagnosis} from "../types"
import { apiBaseUrl } from '../constants'; //"3001/api"

const allEntries = async()=>{
    //localhost:3001/api/diagnoses/all
    const{data} = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses/all`)
    //console.log("*data: ", {data})
    return data
}

const exportedObject = {
  allEntries,
};

export default exportedObject;




/*
import axios from "axios";
const baseUrl = "/api/login";

const login = async (credentials) => {
	const response = await axios.post(baseUrl, credentials);
	return response.data;
};

export default { login };


/*
import axios from 'axios';
import {Patient, PatientFormValues} from "../types"

import { apiBaseUrl } from '../constants';

const getAll = async()=>{
    const{data} = await axios.get<Patient[]>(`${apiBaseUrl}/patients`)
    return data
}

const create = async (object: PatientFormValues) => {
    const { data } = await axios.post<Patient>(
      `${apiBaseUrl}/patients`,
      object
    );
  
    return data;
  };

// eslint-disable-next-line import/no-anonymous-default-export
export default {create, getAll}
*/