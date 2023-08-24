import diagnosesEntries from "../data/diagnosesEntries";
import { allEntryType, nonLatinEntryType } from "../types";

const getAllEntries = (): allEntryType[]=>{
    //console.log("test", diagnosesEntries);
    return diagnosesEntries.allEntries;
};

const getNonLatinEntries = ():nonLatinEntryType[]=>{
    return diagnosesEntries.nonLatinEntries.map(({code, name})=>({code, name}));
};

export default {getAllEntries, getNonLatinEntries};
