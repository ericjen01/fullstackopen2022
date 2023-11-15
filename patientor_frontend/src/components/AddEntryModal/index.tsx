import { Dialog, DialogTitle, DialogContent, Divider, Alert } from '@mui/material';

import AddEntryForm from './AddEntryForm';
import { Entry } from "../../types";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: Entry) => void; 
  error?: string;
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
  <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
    <DialogTitle sx={{mb:-3.25, mt:-1.75}}>Add a New Entry</DialogTitle>
    <Divider/>
    <DialogContent>
      {error && <Alert severity="error" sx={{mb:1, mt:-1.25}}>Please complete all required fields</Alert>}
      <AddEntryForm onSubmit={onSubmit} onCancel={onClose} error={error}/>
    </DialogContent>
  </Dialog>
);

export default AddEntryModal;