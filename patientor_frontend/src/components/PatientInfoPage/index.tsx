import { Entry, Patient, } from "../../types";
import{useState, useEffect} from 'react'
import { useParams } from "react-router-dom";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import patientInfoService from "../../services/patientInfo"


interface Props {
    patients : Patient[]
    setPatients: React.Dispatch<React.SetStateAction<Patient[]>>
  }

const PatientInfoPage = ({ patients, setPatients }: Props) => {
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
    
    const patientEntry = ()=>{
        if(patientInfo.entries?.length ){
            return (
            <div>
                <h3>Entries</h3>
                {Object.values(patientInfo.entries).map((e:Entry)=>(
                    <div key={e.id}>
                        <span>{e.date} {e.description}</span> 
                        <ul>
                            {e.diagnosisCodes?.map((d,i) =><li key={i}>{d}</li>)}
                        </ul>
                    </div>
                ))}
            </div>
            )
        }
     
    }

    const GenIcon=()=>{
        switch(patientInfo?.gender){
            case "male": return <MaleIcon style={{ color: 'blue' }}/>;
            case "female": return <FemaleIcon style={{ color: 'red' }}/>;
            case "other": return <TransgenderIcon style={{ color: 'pink' }}/>;
        }
    }
    
    return (
        <div>
            <h2>Clinical Profile</h2>
            <h2>{patientInfo?.name}, {patientInfo?.gender} {GenIcon()}</h2>
            <span>SSN: {patientInfo?.ssn}</span>
            <span><br/>Occupation: {patientInfo?.occupation}</span>
            {patientEntry()}
        </div>
    )
}
export default PatientInfoPage