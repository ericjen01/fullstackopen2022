import { HealithinessBar, CareTypeIcon,  } from "./IconPack"
import { Entry,Diagnosis,TreatmentCategory, HospitalEntry } from "../types"

const HealthCareEntry = (entry:Entry, diagnoses:Diagnosis[]) =>{
    const addDiagnosisDescription =(diagCode:string)=>{
        const match = (diagnoses.filter(d=>d.code === diagCode))[0]?.name
        return match
    }

    const HospitalEntry = () =>{
        const Discharge = (obj: { [s: string]: HospitalEntry }) => {
            let entry = Object.values(obj)[0]
            if("discharge" in entry && entry.discharge){
                 return (
                    <div>
                        <span>Discharged on: {entry.discharge.date} <br/></span>
                        <span >Criteria: {entry.discharge.criteria}<br/></span>
                    </div>
                 ) 
            }return null;
        };
        return (
            <div style={{border: '1px solid rgba(0, 0, 0, 0.5)', padding: '0.8rem' , margin:"0.4rem"}}>
                <span>{entry.date} <br/></span>
                <span>Hospital Visit {CareTypeIcon(TreatmentCategory.Hospital)} <br/></span>
                <span>Reason of Visit: {entry.description}<br/></span>
                <span style={{paddingTop: "1rem", display: "inline-block"}}>Diagnoses: <br/></span>
                <ul>
                    {entry.diagnosisCodes?.map((diagCode,i) =>
                    <li key={i}> {diagCode} {addDiagnosisDescription(diagCode)}</li>
                    )}
                </ul>
                <Discharge obj = {entry as HospitalEntry} />
                <span style={{paddingTop: "1rem", display: "inline-block"}}> diagnose by {entry.specialist} </span>
            </div> 
        )     
    }

    const OccupationalHealthcareEntry = () =>{
        return (
            <div style={{border: '1px solid rgba(0, 0, 0, 0.5)', padding: '0.8rem' , margin:"0.4rem"}}>
                <span>{entry.date} <br/></span>
                <span> Occupational Healthcare {CareTypeIcon(TreatmentCategory.OccupationalHealthcare)} <br/></span>
                <span>Employer Name: {entry.employerName} <br/></span>
                <span>Reason of Visit: {entry.description}</span>
                <ul>
                    {entry.diagnosisCodes?.map((diagCode,i) =>
                    <li key={i}> {diagCode} {addDiagnosisDescription(diagCode)}</li>
                    )}
                </ul>
                <span> diagnose by {entry.specialist} </span>
            </div>  
        )     
    }
    const HealthCheckEntry = () =>{
        return (
            <div style={{border: '1px solid rgba(0, 0, 0, 0.5)', padding: '0.8rem', margin:"0.4rem"}}>
                <span>{entry.date} <br/></span>
                <span> Health Check {CareTypeIcon(TreatmentCategory.HealthCheck)} <br/></span>
                <span>Employer Name: {entry.employerName} <br/></span>
                <span>{entry.description}<br/></span>
                <span>Health Check Rating: {HealithinessBar(entry.healthCheckRating)} <br/></span>
                <ul>
                    {entry.diagnosisCodes?.map((diagCode,i) =>
                    <li key={i}> {diagCode} {addDiagnosisDescription(diagCode)}</li>
                    )}
                </ul>
                <span> diagnose by {entry.specialist} </span>
            </div>  
        )     
    }

        switch(entry.treatment){
            case entry.treatment=TreatmentCategory.Hospital: return <HospitalEntry/>;
            case entry.treatment=TreatmentCategory.OccupationalHealthcare: return <OccupationalHealthcareEntry/>;
            case entry.treatment=TreatmentCategory.HealthCheck: return <HealthCheckEntry/>;
            default: return null;
        }
 

}
export default HealthCareEntry;


