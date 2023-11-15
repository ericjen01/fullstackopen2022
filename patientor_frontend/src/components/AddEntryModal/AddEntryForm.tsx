import { useState, useEffect, SyntheticEvent } from "react";
import {Box, TextField, InputLabel, MenuItem, Select, Grid, Button, SelectChangeEvent, FormControl, InputAdornment} from '@mui/material';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { BaseEntry, Entry, Diagnosis, TreatmentCategory, HealthCheckRating } from "../../types";
import specialistListService from "../../services/specialists";
import diagnosesService from "../../services/diagnoses";

interface Props {
    onCancel: () => void;
    onSubmit: (values: Entry) => void;
    error?: string;
  }
  
const AddEntryForm = ({onCancel, onSubmit, error}: Props) =>{
    const [treatment, setTreatment]=useState<TreatmentCategory>(TreatmentCategory.Hospital)
    const [date, setDate]=useState<any>('');
    const [description, setDescription]=useState('');

    const [existingSepcialists, setExistingSpecialists]=useState<BaseEntry["specialist"][]>(['']);
    const [specialist, setSpecialist]=useState<BaseEntry["specialist"]>('');
   
    const [existingDiagnoses, setExistingDiagnoses]=useState<Diagnosis[]>([]);
    const [diagnosisCodes, setDiagnosisCodes]=useState<Diagnosis["code"][]>([])
    const [showCodes, setShowCodes]=useState(false)

    const [dischargeDate, setDischargeDate]=useState('')
    const [dischargeCriteria, setDischargeCriteria]=useState('')

    const [sickLeaveStartDate, setSickLeaveStartDate]=useState('')
    const [sickLeaveEndDate, setSickLeaveEndDate]=useState('')

    const [healthCheckRating, setHealthCheckRating]=useState<HealthCheckRating>(''as unknown as HealthCheckRating)

    const [employerName, setEmployerName]=useState('')

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

    const onDiagnosisChange = (e:SelectChangeEvent<any>) => {
        e.preventDefault();
        if(diagnosisCodes.length >= 0) setShowCodes(true);
        const value = e.target.value;
        const codes = diagnosisCodes.concat(value)
        setDiagnosisCodes(codes);
    }

    const undoDiagnosisCodes=()=>{
        if(diagnosisCodes.length <= 1) setShowCodes(false);
        setDiagnosisCodes(diagnosisCodes.slice(0,-1))
    }

    const validInput=(input:any, name:string, message="")=>(
        (typeof error!=="undefined" && input.length<=2)?(String.fromCharCode(0x26A0) +" "+ name + message):name
    )
    
    const addEntry=(event: SyntheticEvent) => {
        event.preventDefault();
        switch(treatment){
            case "Hospital":
                onSubmit({
                    date,
                    specialist,
                    description,
                    diagnosisCodes,
                    treatment,
                    discharge:{
                        date: dischargeDate,
                        criteria: dischargeCriteria,
                    }
                })
                break;
            case "OccupationalHealthcare":
                onSubmit({
                    date,
                    specialist,
                    description,
                    diagnosisCodes,
                    treatment,
                    sickLeave:{
                        startDate: sickLeaveStartDate,
                        endDate: sickLeaveEndDate,
                    }
                })
                break;
            case "HealthCheck": 
                onSubmit({
                    date,
                    specialist,
                    description,
                    diagnosisCodes,
                    treatment,
                    healthCheckRating,
                })
                break;    
        }
    };
    return (
        <div>
            <form onSubmit = {addEntry}>
                <Grid container direction={"column"} spacing={1}>
                    <Grid item>
                        <FormControl fullWidth size="small"> 
                            <InputLabel>Select a Service Type</InputLabel>
                            <Select  
                                label="Select a Service Type"
                                value={treatment}
                                onChange={onTypeChange }
                                size="small" 
                            >
                                <MenuItem value={TreatmentCategory.Hospital}> Hospital Visit</MenuItem>
                                <MenuItem value={TreatmentCategory.OccupationalHealthcare}> Occupational Healthcare </MenuItem>
                                <MenuItem value={TreatmentCategory.HealthCheck}> Health Check </MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    {treatment==="OccupationalHealthcare" && <Grid item> 
                        <TextField 
                            fullWidth
                            size="small"
                            label={(validInput(employerName, "Employer Name", "- min. 3 characters"))}
                            value={employerName}
                            onChange={({target})=>setEmployerName(target.value)}
                        />
                    </Grid>}
                    <Grid item>
                        <LocalizationProvider dateAdapter={AdapterDayjs} >
                            <MobileDatePicker 
                                slotProps={{ textField: { fullWidth:true, size:"small",} }}
                                label={validInput(date, "Select Entry Date")}
                                format="YYYY/MM/DD"
                                value={null}
                                onChange={(target)=>setDate(dayjs(target).toISOString().slice(0,10))}
                            />
                        </LocalizationProvider>                          
                    </Grid>
                    <Grid item>
                        <TextField 
                            fullWidth 
                            size="small" 
                            label={validInput(description, "Description", "- min. 3 characters")}                          
                            value={description} 
                            onChange={({target})=>setDescription(target.value)}
                        />
                    </Grid>
                    <Grid item>
                        <FormControl fullWidth size="small"> 
                            <InputLabel>
                                {validInput(specialist, "Select Specialist")}                            
                            </InputLabel>
                            <Select  
                                label={validInput(specialist.toString(), "Select Specialist")}
                                value= {specialist}
                                onChange={({target})=>setSpecialist(target.value)}
                            >
                                {existingSepcialists.map((s,i) => 
                                    <MenuItem key={i} value={s}>{s}</MenuItem>
                                )}
                            </Select>
                        </FormControl>
                    </Grid>
                    {treatment==="Hospital" && <Grid item>
                        <FormControl fullWidth size="small"> 
                            <InputLabel>
                                {validInput(diagnosisCodes.toString(), "Select Diagnosis Code(s)")}                              
                            </InputLabel>
                            <Select 
                                label={validInput(diagnosisCodes.toString(),"Select Diagnosis Code(s)")}      
                                value=""   
                                onChange={onDiagnosisChange}
                            >
                            {existingDiagnoses.map((d,i) => (
                                <MenuItem key={i} value={d["code"]}> {d["code"] + ": "} {d["name"]}</MenuItem>
                            ))}  
                            </Select>
                        </FormControl>
                    </Grid>}
                    {treatment==="OccupationalHealthcare" && <Grid item>
                        <FormControl fullWidth size="small"> 
                            <InputLabel>Select Diagnosis Code(s) - Optional</InputLabel>
                            <Select 
                                label="Select Diagnosis Code(s) - Optional"  
                                value=""   
                                onChange={onDiagnosisChange}
                            >
                            {existingDiagnoses.map((d,i) => (
                                <MenuItem key={i} value={d["code"]}> {d["code"] + ": "} {d["name"]}</MenuItem>
                            ))}  
                            </Select>
                        </FormControl>
                    </Grid>}
                    {(treatment==="Hospital"||treatment==="OccupationalHealthcare") && <Grid>
                        {showCodes &&  <TextField 
                            sx={{mt:1}}
                            variant="standard"
                            disabled 
                            fullWidth
                            size="small" 
                            value = {diagnosisCodes.join(",  ")}
                            InputProps={{
                                disableUnderline: true,
                                startAdornment:
                                    <InputAdornment sx={{mx:3,}} position="end" >
                                        Code(s) Selected: 
                                    </InputAdornment>,
                                endAdornment:  
                                    <InputAdornment position="end">
                                        <Button variant="outlined" color="inherit" size="small" 
                                        onClick={undoDiagnosisCodes}
                                        >UNDO</Button>
                                    </InputAdornment>,
                            }}
                        />}
                    </Grid>}
                    {treatment==="Hospital" && <Grid item>
                        <LocalizationProvider dateAdapter={AdapterDayjs} >
                            <MobileDatePicker 
                                slotProps={{ textField: { fullWidth:true, size:"small"} }}
                                label={validInput(dischargeDate, "Discharge Date")}   
                                format="YYYY/MM/DD"
                                value={null}
                                onChange={(target)=>setDischargeDate(dayjs(target).toISOString().slice(0,10))}
                            />
                        </LocalizationProvider>  
                    </Grid>}
                    {treatment==="Hospital" && <Grid item>
                        <TextField 
                            fullWidth 
                            size="small" 
                            label={validInput(dischargeCriteria, "Discharge Note", "- min. 3 characters")}              
                            value={dischargeCriteria} 
                            onChange={({target})=>setDischargeCriteria(target.value)}
                        />          
                    </Grid>}
                    {treatment==="OccupationalHealthcare" && <Grid item sx={{mt:-1}}>
                        <Box sx={{ml:1, height:'1'}} >Select Sick Leave Period - Optional</Box>
                        <Grid container justifyContent="center" alignItems="center" spacing={2}>
                            <Grid item xs={5.6}>
                                <LocalizationProvider dateAdapter={AdapterDayjs} >
                                    <DemoContainer components={['DatePicker']}>
                                        <MobileDatePicker 
                                        label="Start Date"  
                                        slotProps={{ textField: { fullWidth:true, size:"small"} }}
                                        format="YYYY/MM/DD"
                                        value={null}
                                        onChange={(target)=>setSickLeaveStartDate(dayjs(target).toISOString().slice(0,10))}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>  
                            </Grid>   
                            <Grid item > to </Grid>
                            <Grid item xs={5.6}>
                                <LocalizationProvider dateAdapter={AdapterDayjs} >
                                        <DemoContainer components={['DatePicker']}>
                                            <MobileDatePicker 
                                                slotProps={{ textField: { fullWidth:true, size:"small"} }}label="End Date"  
                                                format="YYYY/MM/DD"
                                                value={null}
                                                onChange={(target)=>setSickLeaveEndDate(dayjs(target).toISOString().slice(0,10))}
                                            />
                                        </DemoContainer>
                                    </LocalizationProvider>  
                            </Grid>  
                        </Grid>   
                    </Grid>}
                    {treatment==="HealthCheck" && <Grid item>
                        <FormControl fullWidth size="small"> 
                            <InputLabel >
                                {validInput(healthCheckRating, "Health Rating")}
                            </InputLabel>
                            <Select 
                                label={validInput(healthCheckRating, "Health Rating")}
                                value={healthCheckRating}
                                onChange={({target})=>{setHealthCheckRating(target.value as HealthCheckRating)
                                }}
                            >
                                <MenuItem value={0}>0 - Healthy</MenuItem>
                                <MenuItem value={1}>1 - Low Risk</MenuItem>
                                <MenuItem value={2}>2 - High Risk</MenuItem>
                                <MenuItem value={3}>3 - Critical</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>}
                </Grid> 
                <Grid sx={{mt:1}}>
                    <Grid item>
                        <Button
                            color="secondary"
                            variant="contained"
                            style={{ float:"left", marginTop:"1"}}
                            type="button"
                            onClick={onCancel}
                            >
                            Cancel
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            style={{float:"right", marginTop:"1"}}
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


