import { Diagnosis, Entry, Patient } from "../../types";
import{useState, useEffect} from 'react'
import { useParams } from "react-router-dom";
import { GenIcon } from "../IconPack";

import patientInfoService from "../../services/patientInfo"
import HealthCareEntry from "../HealthCareEntry";



interface Props {
    patients : Patient[]
    diagnoses: Diagnosis[]
    setPatients: React.Dispatch<React.SetStateAction<Patient[]>>
  }

const PatientInfoPage = ({ patients, setPatients, diagnoses }: Props) => {
    const [patientInfo, setPatientInfo] = useState<Patient>(Object)
    const params = useParams() //returns "{id: 'xxx-xxx-...'}"
    const patientId = params.id; //returns id in string form
  
    useEffect(() => {
        const fetchPatientInfo = async ()=>{
            const patientInfo = await patientInfoService(patientId)
            setPatientInfo(patientInfo)
        }
        fetchPatientInfo()
    }, [patientId]);
    
    const patientEntry =()=>{
        if(patientInfo.entries?.length ){
            return (
            <div>
                <h3>Entries</h3>
                {Object.values(patientInfo.entries).map((e:Entry)=>{
                   return HealthCareEntry(e, diagnoses )
                   
                })
                }
            </div>
            )//return
        }//if
    }
    
    return (
        <div>
            <h2>Clinical Profile</h2>
            <h2>{patientInfo?.name}, {patientInfo?.gender} {GenIcon(patientInfo)}</h2>
            <span>SSN: {patientInfo?.ssn}</span>
            <span><br/>Occupation: {patientInfo?.occupation}</span>
            {patientEntry()}
        </div>
    )
}
export default PatientInfoPage