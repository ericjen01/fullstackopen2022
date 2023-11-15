import { Diagnosis, Entry, Patient } from "../../types";
import {useState, useEffect} from 'react'
import { Button, Divider } from '@mui/material';
import { useParams } from "react-router-dom";
import { GenIcon } from "../IconPack";
import patientInfoService from "../../services/patientInfo"
import HealthCareEntry from "../HealthCareEntry";
import axios from 'axios';
import AddEntryModal from "../AddEntryModal";

interface Props {
    patients : Patient[]
    diagnoses: Diagnosis[]
    setPatients: React.Dispatch<React.SetStateAction<Patient[]>>
  }

const PatientInfoPage = ({ patients, setPatients, diagnoses }: Props) => {
    const [patientInfo, setPatientInfo] = useState<Patient>(Object)
    const params = useParams() 
    const patientId = params.id; 
    const [entries, setEntries] = useState<Entry[]>([])
    const [error, setError] = useState<string>();
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const openModal = (): void => setModalOpen(true);
    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    useEffect(() => {
        const fetchPatientInfo = async ()=>{
            const patientInfo = await patientInfoService.getInfo(patientId)
            setPatientInfo(patientInfo)
            setEntries(patientInfo.entries!)
        }
        fetchPatientInfo()
    }, [patientId]);

    const submitNewEntry = async (values:Entry) => {
        try{
            const newEntry = await patientInfoService.create(values, patientInfo.id );
            setEntries(entries.concat(newEntry));
            setModalOpen(false);
            setError(undefined);
        }catch (e:unknown){
            if (axios.isAxiosError(e)) {
                if (e?.response?.data && typeof e?.response?.data === "string") {
                  const message = e.response.data.replace('Something went wrong. Error: ', '');
                  console.error(message);
                  setError(message);
                } else {
                  setError("Unrecognized axios error");
                }
              } else {
                console.error("Unknown error", e);
                setError("Unknown error");
              }
        }
    }
    
    const patientTreatmentHistory =()=>(
        (!entries)?(<h3>No Treatment History</h3>):
             (
            <div>
               <h3>Patient History</h3>
                {Object.values(entries).map((e:Entry)=>{
                   return (
                    <div key={e.id}>
                        {HealthCareEntry(e, diagnoses )}
                    </div>  
                   )
                })
                }
            </div>
            )
        
    )  
    return (
        <div className="container">
            <h2>Clinical Profile</h2>
            <h2>{patientInfo.name}, {patientInfo.gender} {GenIcon(patientInfo)}</h2>
            <span>SSN: {patientInfo.ssn}</span>
            <span><br/>Occupation: {patientInfo?.occupation}<br/></span><br/>
            <Divider/> 
            {patientTreatmentHistory()}
            <AddEntryModal
                modalOpen={modalOpen}
                onSubmit={submitNewEntry}
                error={error}
                onClose={closeModal}
            />
            <Button variant="contained" onClick={() => openModal()}>
                Add New Entry
            </Button>
        </div>
    )
}
export default PatientInfoPage