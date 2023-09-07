import { Patient, } from "../../types"
import { useParams } from "react-router-dom";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';

interface Props {
    patients : Patient[]
    setPatients: React.Dispatch<React.SetStateAction<Patient[]>>
  }

const PatientInfoPage = ({ patients, setPatients }: Props) => {

    const params = useParams() //returns "{id: 'xxx-xxx-...'}"
    const patientId = params.id; //returns id in string form
    const patientInfo = patients.find(p=>p.id===patientId)
    
   /* const GenIcon=()=>{
        if (patientInfo?.gender==="male"){
            return <MaleIcon style={{ color: 'orange' }}/>
        }
    }*/

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
        </div>
    )
}
export default PatientInfoPage

/*interface Props {
    patientInfo: Patient,
    setPatientInfo: React.Dispatch<React.SetStateAction<Patient>>

const PatientInfoPage = ({ patientInfo, setPatientInfo }: Props) => {

const GenIcon=()=>{
    const params = useParams()
    console.log("PARAMS: ", params);
    if (JSON.stringify(patientInfo.gender)===`"female"`){
        return <MaleIcon style={{ color: 'orange' }}/>
    }
}


    return (
        <div>
            <h2>Clinical Profile</h2>
            <h2>{patientInfo.name}, {patientInfo.gender} {GenIcon()}</h2>
            <span>SSN: {patientInfo.ssn}</span>
            <span><br/>Occupation: {patientInfo.occupation}</span>
        </div>
    )
}

export default PatientInfoPage

*/