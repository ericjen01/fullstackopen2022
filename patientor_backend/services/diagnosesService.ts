import {allDiagonses, nonLatinEntries} from "../data/diagnosesEntries";
import { Diagnosis, nonLatinEntryType } from "../types";

const getAllDiagnoses = (): Diagnosis[]=>{
    //console.log("test", diagnosesEntries);
    return allDiagonses;
};

const getNonLatinEntries = ():nonLatinEntryType[]=>{
    return nonLatinEntries.map(({code, name})=>({code, name}));
};

export default {getAllDiagnoses, getNonLatinEntries};
