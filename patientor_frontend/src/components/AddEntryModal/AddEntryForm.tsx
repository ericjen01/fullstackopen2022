import { useState, useEffect, SyntheticEvent } from "react";
import { TextField, InputLabel, MenuItem, Select, Grid, Button, SelectChangeEvent, FormControl } from '@mui/material';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { BaseEntry, Entry, Diagnosis, TreatmentCategory } from "../../types";
import specialistListService from "../../services/specialists";
//import diagnosisCodesService from "../../services/diagnoses";
import diagnosesService from "../../services/diagnoses";

interface Props {
    onCancel: () => void;
    onSubmit: (values: Entry) => void;
  }
  
const AddEntryForm = ({onCancel, onSubmit}: Props) =>{
    const [existingSepcialists, setExistingSpecialists] = useState<BaseEntry["specialist"][]>([""]);
    const [specialist, setSpecialist] = useState<BaseEntry["specialist"]>("");
    const [date, setDate] = useState("today");
    const [description, setDescription] = useState("");
    const [existingDiagnoses, setExistingDiagnoses] = useState<Diagnosis[]>([]);
    const [diagnosisCodes, setDiagnosisCodes] = useState<Diagnosis["code"]>("")
    const [treatment, setTreatment] = useState<string>("")

    useEffect(() => {
        const fetchSpecialistList = async () => {
            const specialists = await specialistListService.specialists();
            setExistingSpecialists(specialists);
        }
        fetchSpecialistList();

        const fetchDiagnoseList = async () => {
            const diagnoses = await diagnosesService.allEntries() 
            setExistingDiagnoses(diagnoses)
          }
          fetchDiagnoseList()
    }, []);

    const onTypeChange = (e:SelectChangeEvent<any>)=>{
        e.preventDefault();
        switch(e.target.value){
            case "Hospital": {
                const value = e.target.value 
                setTreatment(value);
            } break;
            case "OccupationalHealthcare": {
                const value = e.target.value 
                setTreatment(value);
            } break;
            case "HealthCheck": {
                const value = e.target.value 
                setTreatment(value);
            }
        }
    }

    const onSpecialistChange = (e:SelectChangeEvent<any>)=>{
        e.preventDefault();
        const value = e.target.value;
        existingSepcialists.forEach(s => {
            if(value === s) setSpecialist(value);
        })
    }

    const onDiagnosisChange = (e:SelectChangeEvent<any>) => {
        e.preventDefault();
        const value = e.target.value;
        existingDiagnoses.forEach(d => {
            if(value === d["code"]) setDiagnosisCodes(value);
        })
    }

    const addEntry = (event: SyntheticEvent) => {
        event.preventDefault();
        onSubmit({
          date,
          specialist,
          description,
         treatment: TreatmentCategory.Hospital,
        });
    };



    const OptionalEntryLines = () =>{
        switch(treatment){
            case TreatmentCategory.Hospital: return (
                <div>
                    <Grid container direction={"column"} spacing={.75}>
                        <Grid item>
                            <FormControl fullWidth> 
                                <InputLabel id="for-code-select">Select Diagnosis Code(s)</InputLabel>
                                <Select 
                                    labelId="for-code-select"
                                    label="Select Diagnosis Code(s)"  
                                    value={diagnosisCodes}                                  
                                    onChange={onDiagnosisChange}
                                >
                                {existingDiagnoses.map((d,i) => (
                                    <MenuItem key={i} value={d["code"]}> {d["code"] + ": "} {d["name"]}</MenuItem>
                                ))}  
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </div>
            )
            default: return null
        }
    }

    return (
        <div>
            <form onSubmit = {addEntry}>
                <Grid container direction={"column"} spacing={.75}>
                    <Grid item>
                        <FormControl fullWidth> 
                            <InputLabel id="for-service-select">Select a Service Type</InputLabel>
                            <Select  
                                labelId="for-service-select"
                                label="Select a Service Type"
                                value= {treatment}
                                onChange={onTypeChange }
                            >
                                <MenuItem value="Hospital"> Hospital Visit</MenuItem>
                                <MenuItem value="OccupationalHealthcare"> Occupational Healthcare </MenuItem>
                                <MenuItem value="thCheck"> Health Check </MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <LocalizationProvider dateAdapter={AdapterDayjs} >
                            <DatePicker 
                            value={date}
                            slotProps={{ textField: { fullWidth: true } }}
                            format="YYYY/MM/DD"
                            onChange={(target)=>setDate(dayjs(target).toISOString().slice(0,10))}
                            />
                        </LocalizationProvider>                          
                    </Grid>
                    <Grid item>
                        <TextField label="Description" 
                            placeholder="add descrption/comments"
                            fullWidth 
                            value={description} 
                            onChange={({target})=>setDescription(target.value)}
                        />
                    </Grid>
                    <Grid item>
                        <FormControl fullWidth > 
                            <InputLabel id="for-specialist-select">Select a Specialist</InputLabel>
                            <Select  
                                labelId="for-specialist-select"
                                label="Select a Specialist"
                                value= {specialist}
                                onChange={onSpecialistChange}
                            >
                                {existingSepcialists.map((s,i) => 
                                    <MenuItem key={i} value={s}>{s}</MenuItem>
                                )}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <OptionalEntryLines/>
                    </Grid>
                </Grid> 
                <Grid>
                    <Grid item>
                        <Button
                            color="secondary"
                            variant="contained"
                            style={{ float: "left" }}
                            type="button"
                            onClick={onCancel}
                            >
                            Cancel
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            style={{float: "right",}}
                            type="submit"
                            variant="contained"
                        >
                            Add
                        </Button>
                    </Grid>
                </Grid>
            
            </form>
        </div>
    )
}
export default AddEntryForm;


