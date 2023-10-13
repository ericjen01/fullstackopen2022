import { useState, SyntheticEvent } from "react";
import {  TextField, InputLabel, MenuItem, Select, Grid, Button, SelectChangeEvent, FormControl } from '@mui/material';
import { Entry, Diagnosis, TreatmentCategory } from "../../types";



interface Props {
    onCancel: () => void;
    onSubmit: (values: Entry) => void;
  }
  
//const treatmentOptions:string[] = (Object.values(TreatmentCategory));

const AddEntryForm = ({onCancel, onSubmit}: Props) =>{
    //const [healthCheckRating, setHealthCheckRating] = useState(HealthCheckRating.Healthy);
    //const [employerName, setEmployerName] = useState("");
    const [specialist, setSpecialist] = useState("");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");
    const [diagnosisCodes, setDiagnosisCodes] = useState<Diagnosis["code"][]|string>([])
    const [treatmentCategory, setTreatmentCategory] = useState<Entry["treatment"]>(TreatmentCategory.Hospital)

    const onTypeChange = (e:SelectChangeEvent<any>)=>{
        e.preventDefault();
        switch(e.target.value){
            case "Hospital": {
                const value = e.target.value //const created to ensure prompt update
                setTreatmentCategory(value);
            } break;
            case "Occupational Healthcare": {
                const value = e.target.value //const created to ensure prompt update
                setTreatmentCategory(value);
            } break;
            case "Health Check": {
                const value = e.target.value //const created to ensure prompt update
                setTreatmentCategory(value);
            }
        }
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
                    <TextField label="diagnosisCodes" 
                        fullWidth 
                        value={diagnosisCodes} 
                        onChange={({target})=>setDiagnosisCodes(target.value)}
                    /> 
                    <TextField label="discharge" 
                        fullWidth 
                        value={diagnosisCodes} 
                        onChange={({target})=>setDiagnosisCodes(target.value)}
                    /> 

                </div>
            )
            default: return null
        }
    }

    return (
        <div>
            <form onSubmit = {addEntry}>
                <FormControl fullWidth> 
                    <InputLabel id="for-service-select">Select Service Type</InputLabel>
                    <Select  
                        labelId="for-service-select"
                        label="Select Service Type"
                        value={treatmentCategory}
                        onChange={onTypeChange }
                    >
                        {Object.values(TreatmentCategory).map((op,i) =>
                            <MenuItem key={i} value={op} >
                                {op}
                            </MenuItem>)
                        }
                    </Select>
                </FormControl>

                <TextField label="date" 
                    placeholder="YYYY-MM-DD" 
                    fullWidth 
                    value={date} 
                    onChange={({target})=>setDate(target.value)}
                />
                <TextField label="description" 
                    fullWidth 
                    value={description} 
                    onChange={({target})=>setDescription(target.value)}
                />
                <TextField label="specialist" 
                    fullWidth 
                    value={specialist} 
                    onChange={({target})=>setSpecialist(target.value)}
                />
                <OptionalEntryLines/>
                

                 {/*   <TextField label="employerName" 
                        fullWidth 
                        value={employerName} 
                        onChange={({target})=>setEmployerName(target.value)}
                    />
                    <TextField label="diagnosisCodes" 
                        fullWidth 
                        value={diagnosisCodes} 
                        onChange={({target})=>setDiagnosisCodes(target.value)}
                    />
                    <TextField label="healthCheckRating" 
                        fullWidth 
                    />
                    */}    

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


