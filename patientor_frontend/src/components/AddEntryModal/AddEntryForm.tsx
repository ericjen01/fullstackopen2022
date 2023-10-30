import { useState, useEffect, SyntheticEvent } from "react";
import { TextField, InputLabel, MenuItem, Select, Grid, Button, SelectChangeEvent, FormControl, Box, InputAdornment} from '@mui/material';
import dayjs from 'dayjs';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { SingleInputDateRangeField } from '@mui/x-date-pickers-pro/SingleInputDateRangeField';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
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
    const [dischargeDate, setDischargeDate] = useState("today")
    const [description, setDescription] = useState("");
    const [existingDiagnoses, setExistingDiagnoses] = useState<Diagnosis[]>([]);
    const [diagnosisCodes, setDiagnosisCodes] = useState<Diagnosis["code"][]>([])
    const [showCodes, setShowCodes] = useState(false)
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
        setSpecialist(value)
    }

    const onDiagnosisChange = (e:SelectChangeEvent<any>) => {
        e.preventDefault();
        if(diagnosisCodes.length >= 0) setShowCodes(true);
        const value = e.target.value;
        const codes = diagnosisCodes.concat("  " + value)
        setDiagnosisCodes(codes);
    }

    const undoDiagnosisCodes=()=>{
        if(diagnosisCodes.length <= 1) setShowCodes(false);
        setDiagnosisCodes(diagnosisCodes.slice(0,-1))
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

    const AdditionalEntryLines = () =>{
        switch(treatment){
            case TreatmentCategory.Hospital: return (
                <>
                    <Grid container direction={"column"} spacing={1}>
                        <Grid item>
                            <FormControl fullWidth size="small"> 
                                <InputLabel id="for-code-select">Select Diagnosis Code(s)</InputLabel>
                                <Select 
                                    labelId="for-code-select"
                                    label="Select Diagnosis Code(s)"  
                                    value=""   
                                    onChange={onDiagnosisChange}
                                >
                                {existingDiagnoses.map((d,i) => (
                                    <MenuItem key={i} value={d["code"]}> {d["code"] + ": "} {d["name"]}</MenuItem>
                                ))}  
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <Box
                                sx={{ flexDirection: 'row' }}
                            >
                              {showCodes &&  <TextField 
                                    variant="standard"
                                    disabled 
                                    fullWidth
                                    size="small" 
                                    value = {diagnosisCodes}
                                    InputProps={{
                                        disableUnderline: true,
                                        startAdornment:
                                            <InputAdornment position="end">
                                                Code(s) Selected: 
                                            </InputAdornment>,
                                        endAdornment:  
                                            <InputAdornment position="end">
                                                <Button variant="outlined" color="inherit" size="small" 
                                                onClick={undoDiagnosisCodes}
                                                >UNDO</Button>
                                            </InputAdornment>,
                                    }}
                                >
                                </TextField>}
                            </Box>
                        </Grid>
                        <Grid item>
                            <LocalizationProvider dateAdapter={AdapterDayjs} >
                                <DatePicker 
                                value={dischargeDate}
                                label="Select Discharge Date"  
                                slotProps={{ textField: { fullWidth:true, size:"small"} }}
                                format="YYYY/MM/DD"
                                onChange={(target)=>setDischargeDate(dayjs(target).toISOString().slice(0,10))}
                                />
                            </LocalizationProvider>  
                        </Grid>
                    </Grid>
                </>
            )
            case TreatmentCategory.OccupationalHealthcare: return (
                <>
                    <Grid container direction={"column"}>
                        <Grid item>
                            <TextField 
                                label="Employer Name"
                                placeholder="Add Enployer Name"
                                size="small"
                                fullWidth
                                sx={{marginBottom:1}}
                            />
                        </Grid>
                        <Grid item>
                            <FormControl fullWidth size="small"> 
                                <InputLabel id="for-code-select">Select Diagnosis Code(s) - Optional</InputLabel>
                                <Select 
                                    labelId="for-code-select"
                                    label="Select Diagnosis Code(s)"  
                                    value=""     
                                    onChange={onDiagnosisChange}
                                >
                                {existingDiagnoses.map((d,i) => (
                                    <MenuItem key={i} value={d["code"]}> {d["code"] + ": "} {d["name"]}</MenuItem>
                                ))}  
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item>
                              {showCodes &&  <TextField 
                                    variant="standard"
                                    disabled 
                                    fullWidth
                                    size="small" 
                                    value = {diagnosisCodes}
                                    InputProps={{
                                        disableUnderline: true,
                                        startAdornment:
                                            <InputAdornment position="end">
                                                Code(s) Selected: 
                                            </InputAdornment>,
                                        endAdornment:  
                                            <InputAdornment position="end">
                                                <Button variant="outlined" color="inherit" size="small" 
                                                onClick={undoDiagnosisCodes}
                                                >UNDO</Button>
                                            </InputAdornment>,
                                    }}
                                >
                                </TextField>}
                        </Grid>
                        <Grid item>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['SingleInputDateRangeField']}>
                                    <DateRangePicker 
                                        slots={{ field: SingleInputDateRangeField }} 
                                        slotProps={{ textField: { fullWidth:true, size:"small"} }}
                                        label="Select Sick Leave Period (From - To) - Optional"
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </Grid>
                    </Grid>
                </>
            )
            case TreatmentCategory.HealthCheck: return(
                <>
                    <FormControl fullWidth size="small"> 
                        <InputLabel id="health-rating-select" >Select Health Rating</InputLabel>
                        <Select 
                            labelId="health-rating-select"
                            label="Select Health Rating"  
                            value=""     
                            onChange={onDiagnosisChange}
                        >
                        {existingDiagnoses.map((d,i) => (
                            <MenuItem key={i} value={d["code"]}> {d["code"] + ": "} {d["name"]}</MenuItem>
                        ))}  
                        </Select>
                    </FormControl>
                </>
 
            )
            default: return null
        }
    }

    return (
        <div>
            <form onSubmit = {addEntry}>
                <Grid container direction={"column"} spacing={1.5}>
                    <Grid item>
                        <FormControl fullWidth size="small"> 
                            <InputLabel id="for-service-select">Select a Service Type</InputLabel>
                            <Select  
                                labelId="for-service-select"
                                label="Select a Service Type"
                                value= {treatment}
                                onChange={onTypeChange }
                                size="small" 
                            >
                                <MenuItem value="Hospital"> Hospital Visit</MenuItem>
                                <MenuItem value="OccupationalHealthcare"> Occupational Healthcare </MenuItem>
                                <MenuItem value="HealthCheck"> Health Check </MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <LocalizationProvider dateAdapter={AdapterDayjs} >
                            <DatePicker 
                            value={date}
                            label="Select Etry Date"
                            slotProps={{ textField:{fullWidth:true, size:"small"} }}
                            format="YYYY/MM/DD"
                            onChange={(target)=>setDate(dayjs(target).toISOString().slice(0,10))}
                            />
                        </LocalizationProvider>                          
                    </Grid>
                    <Grid item>
                        <TextField 
                            label="Description" 
                            placeholder="add descrption/comments"
                            fullWidth 
                            size="small" 
                            value={description} 
                            onChange={({target})=>setDescription(target.value)}
                        />
                    </Grid>
                    <Grid item>
                        <FormControl fullWidth size="small"> 
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
                        <AdditionalEntryLines/>
                    </Grid>
                </Grid> 
                <Grid>
                    <Grid item>
                        <Button
                            color="secondary"
                            variant="contained"
                            style={{ float:"left", marginTop:"1rem"}}
                            type="button"
                            onClick={onCancel}
                            >
                            Cancel
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            style={{float:"right", marginTop:"1rem"}}
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


