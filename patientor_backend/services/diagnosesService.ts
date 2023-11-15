import {allDiagonses, nonLatinEntries, diagnosisCodes} from "../data/diagnosesEntries";
import { Diagnosis } from "../types";

const getAllDiagnoses = (): Diagnosis[]=>{
    return allDiagonses;
};
const getNonLatinEntries = (): Diagnosis[]=>{
    return nonLatinEntries; 
};

const getDiagnosisCodes = (): string[]=>{
    return diagnosisCodes;
};

export default {getAllDiagnoses, getNonLatinEntries, getDiagnosisCodes};
