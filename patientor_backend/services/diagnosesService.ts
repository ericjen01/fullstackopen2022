import {allEntries, nonLatinEntries} from "../data/diagnosesEntries";
import { allEntryType, nonLatinEntryType } from "../types";

const getAllEntries = (): allEntryType[]=>{
    //console.log("test", diagnosesEntries);
    return allEntries;
};

const getNonLatinEntries = ():nonLatinEntryType[]=>{
    return nonLatinEntries.map(({code, name})=>({code, name}));
};

export default {getAllEntries, getNonLatinEntries};
