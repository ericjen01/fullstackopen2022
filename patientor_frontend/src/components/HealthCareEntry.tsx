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
        <div style={{marginTop:"1rem"}}> diagnose by {entry.specialist} </div>
    )
    
    const Employer = () => (
        ("employerName" in entry)? 
        (<div style={{marginTop:"1rem"}}> Employer Name: {entry.employerName} </div>)
        : 
        null
    )

    const HealthRating = () =>(
        ("healthCheckRating" in entry)? 
        (<div style={{display:"inline-flex", justifyContent:"center"}}> Health Check Rating: {HealithinessBar(entry.healthCheckRating)} </div>)
        :
        null
    )

    const DiagDetail =(diagCode:string)=>{
        const match = (diagnoses.filter(d=>d.code === diagCode))[0]?.name
        return match
    }

    const Diagnoses = (obj: { [s: string]: Entry }) => {
        const entry = Object.values(obj)[0]
        return(
            (entry.diagnosisCodes)
            ?
            (<div style={{paddingTop: "1rem", display: "inline-block"}}>
                <span>Diagnose Detail: <br/></span>
                <ul>
                    {entry.diagnosisCodes?.map((diagCode,i) =>
                    <li key={i}> {diagCode} {DiagDetail(diagCode)}</li>
                    )}
                </ul>
            </div>)
            :
            null
        )
    }

    const Discharge = (obj: { [s: string]: HospitalEntry }) => {
        const entry = Object.values(obj)[0]
        return(
            (entry.discharge)
            ?
            (<div>
                <span>Discharged on: {entry.discharge.date} <br/></span>
                <span >Criteria: {entry.discharge.criteria}<br/></span>
            </div>)
            :
            null
        )
    };

    return(
        <div style={{border: '1px solid rgba(0, 0, 0, 0.5)', padding:'.8rem', margin:".4rem", borderRadius:".5rem",}}>
            <EntryDate/>
            {entry.treatment==="Hospital" && <>
                <HospitalVisit/>
                <ReasonForVisit/>
                <Diagnoses obj = {entry}/>
                <Discharge obj = {entry as HospitalEntry} />
            </>}
            {entry.treatment==="OccupationalHealthcare" && <>
                <OccupationalHealthcare/>
                <ReasonForVisit/>
                <Employer/>
                <Diagnoses obj = {entry}/><br/>
                </>}
            {entry.treatment==="HealthCheck" && <>
                <HealthCheck/>
                <ReasonForVisit/>
                <HealthRating/>
            </>}
            <DoctorInCharge/>
        </div>
    )
}
export default HealthCareEntry;


