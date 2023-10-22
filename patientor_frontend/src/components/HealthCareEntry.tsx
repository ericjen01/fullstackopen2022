import { HealithinessBar, CareTypeIcon,  } from "./IconPack"
import { Entry,Diagnosis,TreatmentCategory, HospitalEntry } from "../types"

const HealthCareEntry = (entry:Entry, diagnoses:Diagnosis[]) =>{
    
    const EntryDate = () => (
        <div> Date: {entry.date} </div>
    )

    const HospitalVisit = () => (
        <div> Hospital Visit {CareTypeIcon(TreatmentCategory.Hospital)} </div>
    )

    const OccupationalHealthcare = () => (
        <div> Occupational Healthcare {CareTypeIcon(TreatmentCategory.OccupationalHealthcare)} </div>
    )

    const HealthCheck = () => (
        <div> Health Check {CareTypeIcon(TreatmentCategory.HealthCheck)} </div>
    )          

    const ReasonForVisit = () => (
        <div> Reason of Visit: {entry.description} </div>
    )

    const DoctorInCharge = () => (
        <div> diagnose by {entry.specialist} </div>
    )

    const Employer = () => (
        <div> Employer Name: {entry.employerName} </div>
    )

    const HealthRating = () =>(
        <div> Health Check Rating: {HealithinessBar(entry.healthCheckRating)} </div>
    )

    const DiagDetail =(diagCode:string)=>{
        const match = (diagnoses.filter(d=>d.code === diagCode))[0]?.name
        return match
    }

    const Diagnoses = (obj: { [s: string]: Entry }) => {
        const entry = Object.values(obj)[0]
        if(entry.diagnosisCodes){
            return(
                <div style={{paddingTop: "1rem", display: "inline-block"}}>
                    <span>Diagnose Detail: <br/></span>
                    <ul>
                        {entry.diagnosisCodes?.map((diagCode,i) =>
                        <li key={i}> {diagCode} {DiagDetail(diagCode)}</li>
                        )}
                    </ul>
                </div>
            )
        }return null
    }

    const Discharge = (obj: { [s: string]: HospitalEntry }) => {
        const entry = Object.values(obj)[0]
        if(entry.discharge){
             return (
                <div>
                    <span>Discharged on: {entry.discharge.date} <br/></span>
                    <span >Criteria: {entry.discharge.criteria}<br/></span>
                </div>
             ) 
        }return null;
    };

    const HospitalEntry = () =>{
        return (
            <div style={{border: '1px solid rgba(0, 0, 0, 0.5)', padding:'0.8rem', margin:"0.4rem"}}>
                <EntryDate/>
                <HospitalVisit/>
                <ReasonForVisit/>
                <Diagnoses obj = {entry}/>
                <Discharge obj = {entry as HospitalEntry} /><br/>
                <DoctorInCharge/>
            </div> 
        )     
    }

    const OccupationalHealthcareEntry = () =>{
        return (
            <div style={{border: '1px solid rgba(0, 0, 0, 0.5)', padding:'0.8rem', margin:"0.4rem"}}>
                <EntryDate/>
                <OccupationalHealthcare/>
                <Employer/>
                <ReasonForVisit/>
                <Diagnoses obj = {entry}/><br/>
                <DoctorInCharge/>
            </div>  
        )     
    }
    const HealthCheckEntry = () =>{
        return (
            <div style={{border: '1px solid rgba(0, 0, 0, 0.5)', padding:'0.8rem', margin:"0.4rem"}}>
                <EntryDate/>
                <HealthCheck/>
                <Employer/>
                <ReasonForVisit/>
                <HealthRating/>
                <Diagnoses obj = {entry}/><br/>
                <DoctorInCharge/>
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


