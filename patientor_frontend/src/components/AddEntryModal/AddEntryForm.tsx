import { useState, useEffect, SyntheticEvent } from "react";
import { TextField, InputLabel, MenuItem, Select, Grid, Button, SelectChangeEvent, FormControl } from '@mui/material';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Entry, Diagnosis, TreatmentCategory } from "../../types";
import specialistListService from "../../services/specialists";

interface Props {
    onCancel: () => void;
    onSubmit: (values: Entry) => void;
  }
  
const AddEntryForm = ({onCancel, onSubmit}: Props) =>{
    //const [healthCheckRating, setHealthCheckRating] = useState(HealthCheckRating.Healthy);
    //const [employerName, setEmployerName] = useState("");
    const [existingSepcialists, setExistingSpecialists] = useState([""]);
    const [specialist, setSpecialist] = useState(existingSepcialists[0]);
    const [date, setDate] = useState("today");
    const [description, setDescription] = useState("");
    const [diagnosisCodes, setDiagnosisCodes] = useState<Diagnosis["code"][]|string>([])
    const [treatmentCategory, setTreatmentCategory] = useState<Entry["treatment"]>(TreatmentCategory.Hospital)

    useEffect(() => {
        const fetchSpecialistList = async () => {
         const specialists = await specialistListService.specialists();
         setExistingSpecialists(specialists);
        }
        fetchSpecialistList();
    }, []);

    const onTypeChange = (e:SelectChangeEvent<any>)=>{
        e.preventDefault();
        switch(e.target.value){
            case "Hospital": {
                const value = e.target.value //const created to ensure prompt update
                setTreatmentCategory(value);
            } break;
            case "OccupationalHealthcare": {
                const value = e.target.value //const created to ensure prompt update
                setTreatmentCategory(value);
            } break;
            case "HealthCheck": {
                const value = e.target.value //const created to ensure prompt update
                setTreatmentCategory(value);
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

    const addEntry = (event: SyntheticEvent) => {
        event.preventDefault();
        onSubmit({
          //   type,
          date,
          specialist,
          description,
         // employerName,
         treatment: TreatmentCategory.Hospital,
        // treatment: "Hospital",
        });
    };

    const OptionalEntryLines = () =>{
        switch(treatmentCategory){
            case TreatmentCategory.Hospital: return (
                <div>
                    <Grid container direction={"column"} spacing={.75}>
                        <Grid item>
                            <TextField label="Diagnosis Code" 
                            fullWidth 
                            value={diagnosisCodes} 
                            onChange={({target})=>setDiagnosisCodes(target.value)}
                            /> 
                        </Grid>
                        <Grid item>
                            <TextField label="Date of Discharge" 
                            fullWidth 
                            value={diagnosisCodes} 
                            onChange={({target})=>setDiagnosisCodes(target.value)}
                            /> 
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
                            <InputLabel id="for-service-select">Select Service Type</InputLabel>
                            <Select  
                                labelId="for-service-select"
                                label="Select Service Type"
                                value={treatmentCategory}
                                onChange={onTypeChange }
                            >
                                <MenuItem value= {TreatmentCategory.Hospital}> Hospital Visit</MenuItem>
                                <MenuItem value= {TreatmentCategory.OccupationalHealthcare}> Occupational Healthcare </MenuItem>
                                <MenuItem value= {TreatmentCategory.HealthCheck}> Health Check </MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <LocalizationProvider dateAdapter={AdapterDayjs} >
                            <DatePicker 
                            value={date}
                            slotProps={{ textField: { fullWidth: true } }}
                            format="YYYY/MM/DD"
                            //
                            //
                            //
                            // @ts-ignore: Unreachable code error
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
                            <InputLabel id="for-specialist-select">Select Specialist</InputLabel>
                            <Select  
                                labelId="for-specialist-select"
                                label="Select Specialist"
                                value={specialist}
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


