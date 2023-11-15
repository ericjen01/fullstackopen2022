
import { useState, SyntheticEvent } from "react";
import {  TextField, InputLabel, MenuItem, Select, Grid, Button, FormControl } from '@mui/material';
import { PatientFormValues, Gender } from "../../types";
import { LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileDatePicker } from "@mui/x-date-pickers";

interface Props {
  onCancel: () => void;
  onSubmit: (values: PatientFormValues) => void;
  error: string|undefined;
}

interface GenderOption{
  value: Gender;
  label: string;
}

const genderOptions: GenderOption[] = Object.values(Gender).map(v => ({
  value: v, label: v.toString()
}));

const AddPatientForm = ({ onCancel, onSubmit, error }: Props) => {
  const [name, setName] = useState('');
  const [occupation, setOccupation] = useState('');
  const [ssn, setSsn] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState(''as Gender);

  const addPatient = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      name,
      occupation,
      ssn,
      dateOfBirth,
      gender
    });
  };

  const isValidInput = (input: any, itemName: string, message="") =>(
    (typeof error !== "undefined" && input.length<=2)
    ? (String.fromCharCode(0x26A0) + itemName + message)
    : itemName
  )
 
  return (
    <div>
      <form onSubmit={addPatient}>
        <Grid container direction={"column"} spacing={1} mb={2} mt={.25}>
          <Grid item>
            <TextField
            label={isValidInput(name, " Patient Name", "- min. 3 characters")}
            fullWidth
            size="small" 
            value={name}
            onChange={({ target }) => setName(target.value)}
            />
          </Grid>
          <Grid item>
          <TextField
            label={isValidInput(ssn, " Social Security Number", "- required")}
            fullWidth
            size="small" 
            value={ssn}
            onChange={({ target }) => setSsn(target.value)}
            />                              
          </Grid>
          <Grid item>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MobileDatePicker
                label={isValidInput(dateOfBirth, " Select Date of Birth")}
                slotProps={{ textField: { fullWidth:true, size:"small",} }}
                format="YYYY/MM/DD"
                value={null}
                onChange={(target)=>setDateOfBirth(dayjs(target).toISOString().slice(0,10))}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item>
            <TextField
            label={isValidInput(occupation, " Occupation", "- min. 3 characters")}
            fullWidth
            size="small" 
            value={occupation}
            onChange={({ target }) => setOccupation(target.value)}
            />
          </Grid>
          <Grid item>
            <FormControl fullWidth size='small'>       
              <InputLabel>{isValidInput(gender, " Select Gender")}</InputLabel>
                <Select
                  label={isValidInput(gender.toString(), " Select Gender")}
                  value= {gender}
                  onChange={({target})=>setGender(target.value as Gender)}
                >
                  {genderOptions.map((option) => 
                    <MenuItem key={option.label} value={option.value}> {option.label }</MenuItem>
                  )}
                </Select>
            </FormControl>
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
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddPatientForm;