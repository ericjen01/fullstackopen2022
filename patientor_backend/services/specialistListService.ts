import {data_patients} from "../data/patientEntries";

const specialists = () => {
    const specialists: string | string[] = [];
    data_patients.forEach(p=>{
        if(p.entries){
            p.entries.forEach(e => {
                if("specialist" in e ){
                    if(!specialists.includes(e.specialist)){
                        specialists.push(e.specialist);
                    }
                }
            });
        }
    }
    );
    return specialists;
};
specialists();

export default specialists;