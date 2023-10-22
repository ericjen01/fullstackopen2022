import {Diagnosis} from '../../types'
import { Box, Table, TableHead, TableRow, Typography, TableCell,TableBody, } from '@mui/material';

interface Props {
    diagnoses: Diagnosis[]
}

const DiagnosisListPage = (diagnoses:Props) =>{

    return (
        <div className="App">
            <Box>
                <Typography align="center" variant="h6">Diagnoses</Typography>
            </Box>
            
            <Table style={{ marginBottom: "1em" }}>
                <TableHead> 
                    <TableRow>
                        <TableCell>Code</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Latin</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {Object.values(diagnoses.diagnoses).map((diag:Diagnosis,i) => (
                    <TableRow key={i}>
                    <TableCell>{diag.code}</TableCell>
                    <TableCell>{diag.name}</TableCell>
                    <TableCell>{diag.latin}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            
        </div>
    )
}

export default DiagnosisListPage;

