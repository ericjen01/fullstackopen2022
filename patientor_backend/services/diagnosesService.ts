import {allDiagonses, nonLatinEntries} from "../data/diagnosesEntries";
import { Diagnosis } from "../types";

const getAllDiagnoses = (): Diagnosis[]=>{

   /* const objVal = Object.values(allDiagonses);
    const myEnum : string[] = [];
    objVal.map(d=>{
        myEnum.push(d.code + "= " + d.name);
    });
    console.log(myEnum);*/

    return allDiagonses;
};
const getNonLatinEntries = (): Diagnosis[]=>{
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return nonLatinEntries; 
};

export default {getAllDiagnoses, getNonLatinEntries};
