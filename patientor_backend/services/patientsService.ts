import patientEntries from "../data/patientEntries";
import {PatientEntry} from "../types";

const patientEntriesService=():PatientEntry[]=>{
    return patientEntries;
};

export default patientEntriesService;




