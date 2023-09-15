import { HealithinessBar, CareTypeIcon,  } from "./IconPack"

import { Entry,Diagnosis } from "../types"


/*interface Props{
    entry: Entry
    diagnoses:Diagnosis[]
}*/

const HealthCareEntry = (entry:Entry, diagnoses:Diagnosis[]) =>{

    const addDiagnosisDescription =(diagCode:string)=>{
        const match = (diagnoses.filter(d=>d.code === diagCode))[0]?.name
        return match
    }

    const HospitalEntry = () =>{
        return (
            <div key={entry.id} style={{border: '1px solid rgba(0, 0, 0, 0.5)', padding: '0.8rem' , margin:"0.4rem"}}>
                <span>{entry.date} <br/></span>
                <span> Hospital Visit {CareTypeIcon(entry.type)} <br/></span>
                <span>{entry.description}</span>
                <ul>
                    {entry.diagnosisCodes?.map((diagCode,i) =>
                    <li key={i}> {diagCode} {addDiagnosisDescription(diagCode)}</li>
                    )}
                </ul>
                <span> diagnose by {entry.specialist} </span>
            </div>  
        )     
    }

    const OccupationalHealthcareEntry = () =>{
        return (
            <div key={entry.id} style={{border: '1px solid rgba(0, 0, 0, 0.5)', padding: '0.8rem' , margin:"0.4rem"}}>
                <span>{entry.date} <br/></span>
                <span> Occupational Healthcare {CareTypeIcon(entry.type)} <br/></span>
                <span>Employer Name: {entry.employerName} <br/></span>
                <span>{entry.description}</span>
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
            <div key={entry.id} style={{border: '1px solid rgba(0, 0, 0, 0.5)', padding: '0.8rem', margin:"0.4rem"}}>
                <span>{entry.date} <br/></span>
                <span> Health Check {CareTypeIcon(entry.type)} <br/></span>
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

    switch(entry.type){
        case "Hospital": return <HospitalEntry/>;
        case "OccupationalHealthcare": return <OccupationalHealthcareEntry/>;
        case "HealthCheck": return <HealthCheckEntry/>;
        default: return null
    }
}

export default HealthCareEntry;


