import {allDiagonses, nonLatinEntries} from "../data/diagnosesEntries";
import { Diagnosis } from "../types";

const getAllDiagnoses = (): Diagnosis[]=>{
    return allDiagonses;
};
const getNonLatinEntries = (): Diagnosis[]=>{
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return nonLatinEntries; 
};

export default {getAllDiagnoses, getNonLatinEntries};
