import { Dialog, DialogTitle, DialogContent, Alert } from '@mui/material';
import AddPatientForm from "./AddPatientForm";
import { PatientFormValues } from "../../types";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: PatientFormValues) => void;
  error?: string;
}

const AddPatientModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
  <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
    <DialogTitle sx={{mb:-0.5}}>Add a New Patient</DialogTitle>
    <DialogContent>
      {error && <Alert severity="error" sx={{mb:1, mt:-1}}>Please complete all required fields</Alert>}
      <AddPatientForm onSubmit={onSubmit} onCancel={onClose} error={error}/>
    </DialogContent>
  </Dialog>
);

export default AddPatientModal;