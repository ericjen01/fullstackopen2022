import { useState, useEffect, SyntheticEvent } from "react";
import {Box, TextField, InputLabel, MenuItem, Select, Grid, Button, SelectChangeEvent, FormControl, InputAdornment} from '@mui/material';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { BaseEntry, Entry, Diagnosis, TreatmentCategory } from "../../types";
import specialistListService from "../../services/specialists";
import diagnosesService from "../../services/diagnoses";

interface Props {
    onCancel: () => void;
    onSubmit: (values: Entry) => void;
  }
  
const AddEntryForm = ({onCancel, onSubmit}: Props) =>{
    const [treatment, setTreatment] = useState<TreatmentCategory>(TreatmentCategory.Hospital)
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");

    const [existingSepcialists, setExistingSpecialists] = useState<BaseEntry["specialist"][]>([""]);
    const [specialist, setSpecialist] = useState<BaseEntry["specialist"]>("");
   
    const [existingDiagnoses, setExistingDiagnoses] = useState<Diagnosis[]>([]);
    const [diagnosisCodes, setDiagnosisCodes] = useState<Diagnosis["code"][]>([])
    const [showCodes, setShowCodes] = useState(false)

    const [dischargeDate, setDischargeDate] = useState("")
    const [dischargeCriteria, setDischargeCriteria] = useState("")

    const [sickLeaveStartDate, setSickLeaveStartDate] = useState("")
    const [sickLeaveEndDate, setSickLeaveEndDate] = useState("")

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
        const codes = diagnosisCodes.concat(value)
        setDiagnosisCodes(codes);
    }

    const undoDiagnosisCodes=()=>{
        if(diagnosisCodes.length <= 1) setShowCodes(false);
        setDiagnosisCodes(diagnosisCodes.slice(0,-1))
    }

    const addEntry = (event: SyntheticEvent) => {
        event.preventDefault();
        if(treatment === "Hospital"){
           // console.log("dischargeDate: ", dischargeDate)
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
        }
    /*    onSubmit({
            date,
            specialist,
            description,
            treatment,
            diagnosisCodes,
          //  dischargeDate,
           // dischargeCriteria

        });*/
    };

    
    /*const AdditionalEntryLines = () =>{
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
                              {showCodes &&  <TextField 
                                    variant="standard"
                                    disabled 
                                    fullWidth
                                    size="small" 
                                    value = {diagnosisCodes.join(",  ")}
                                    InputProps={{
                                        disableUnderline: true,
                                        startAdornment:
                                            <InputAdornment 
                                            sx={{marginRight:2}}
                                            position="end">
                                                `Code(s) Selected: 
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
                            <LocalizationProvider dateAdapter={AdapterDayjs} >
                                <DatePicker 
                                value={dayjs(dischargeDate)}
                                label="Select Discharge Date"  
                                slotProps={{ textField: { fullWidth:true, size:"small"} }}
                                format="YYYY/MM/DD"
                                onChange={(target)=>setDischargeDate(dayjs(target).toISOString().slice(0,10))}
                                />
                            </LocalizationProvider>  
                        </Grid>
                        <Grid item>
                            <TextField 
                                label="Discharge Criteria" 
                                placeholder="add discharge detail/criteria"
                                fullWidth 
                                size="small" 
                                value={dischargeCriteria} 
                                onChange={({target})=>setDischargeCriteria(target.value)}
                            />          
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
                                    value = {diagnosisCodes.join(",  ")}
                                    InputProps={{
                                        disableUnderline: true,
                                        startAdornment:
                                            <InputAdornment 
                                            sx={{marginRight:2}}
                                            position="end" >
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
    }*/

    
    return (
        <div>
            <form onSubmit = {addEntry}>
                <Grid container direction={"column"} spacing={1}>
                    <Grid item>
                        <FormControl fullWidth size="small"> 
                            <InputLabel>Select a Service Type</InputLabel>
                            <Select  
                                label="Select a Service Type"
                                value= {treatment}
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
                            label="Employer Name"
                            placeholder="Add Enployer Name"
                            size="small"
                            fullWidth
                        />
                    </Grid>}
                    <Grid item>
                        <LocalizationProvider dateAdapter={AdapterDayjs} >
                            <DatePicker 
                            value={null}
                            label="Select Entry Date"
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
                    {treatment==="Hospital" && <Grid item>
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
                    </Grid>}
                    {treatment==="OccupationalHealthcare" && <Grid item>
                        <FormControl fullWidth size="small"> 
                            <InputLabel id="for-code-select">Select Diagnosis Code(s) - Optional</InputLabel>
                            <Select 
                                labelId="for-code-select"
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
                            <DatePicker 
                            value={null}
                            label="Select Discharge Date"  
                            slotProps={{ textField: { fullWidth:true, size:"small"} }}
                            format="YYYY/MM/DD"
                            onChange={(target)=>setDischargeDate(dayjs(target).toISOString().slice(0,10))}
                            />
                        </LocalizationProvider>  
                    </Grid>}
                    {treatment==="Hospital" && <Grid item>
                        <TextField 
                            label="Discharge Criteria" 
                            placeholder="add discharge detail/criteria"
                            fullWidth 
                            size="small" 
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
                                        <DatePicker 
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
                                            <DatePicker 
                                            label="End Date"  
                                            slotProps={{ textField: { fullWidth:true, size:"small"} }}
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


