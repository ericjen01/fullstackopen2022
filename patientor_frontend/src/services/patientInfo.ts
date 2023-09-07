
import axios from 'axios';
import {Patient} from "../types";
import { apiBaseUrl } from "../constants";


const getAll = async()=>{
    const {data} = await axios.get<Patient>(`${apiBaseUrl}/patients/:id`)
    return data
}

export default getAll

/*-------------------------------

import axios from 'axios';
import {Patient, PatientFormValues} from "../types"

import { apiBaseUrl } from '../constants';

const getAll = async()=>{
  //3001/api/patients
    const{data} = await axios.get<Patient[]>(`${apiBaseUrl}/patients`)
    return data
}


const create = async (object: PatientFormValues) => {
    const { data } = await axios.post<Patient>(
      //3001/api/patients
      `${apiBaseUrl}/patients`,
      object
    );
  
    return data;
};

const exportedObject={
  getAll, create
}

// eslint-disable-next-line import/no-anonymous-default-export
export default exportedObject

/*--------------------------------------


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



------------------------*/




