import {Patient } from "../types";
import { Rating } from "@mui/material";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import BadgeIcon from '@mui/icons-material/Badge';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import { styled } from '@mui/material/styles';
import { TreatmentCategory } from "../types";


const StyledHealthinessBar = styled(Rating)({
    iconFilled: {
        color: "#ff6d75",
      },
      iconHover: {
        color: "#ff3d47",
      }
})
export const HealithinessBar = (rating:number|any) => {
    switch(4-rating){
        case 1:  return(  //critical
                    <span style={{display:"inline-flex", justifyContent:"center"}}>
                    <StyledHealthinessBar
                        sx={{mx:1}}
                        readOnly
                        value={4-rating}
                        precision={1}
                        max={4}
                        icon={<ErrorOutlineIcon fontSize="inherit" sx={{color:'red'}}/>}
                        emptyIcon={<SentimentVerySatisfiedIcon fontSize="inherit"/>}
                    /> <span> -- Critical Health Concerns </span>
                    </span>
                )
        case 2:  return( //high risk
                    <span style={{display:"inline-flex", justifyContent:"center"}}>
                    <StyledHealthinessBar
                        sx={{mx:1}}
                        readOnly
                        value={4-rating}
                        precision={1}
                        max={4}
                        icon={<SentimentVeryDissatisfiedIcon fontSize="inherit" sx={{color:'darkorange'}}/>}
                        emptyIcon={<SentimentVerySatisfiedIcon fontSize="inherit" />}
                    /> <span> -- High Risk </span>
                    </span>
                )
        case 3:  return( //low risk
                    <span style={{display:"inline-flex", justifyContent:"center"}}>
                    <StyledHealthinessBar
                        sx={{mx:1}}
                        readOnly
                        value={4-rating}
                        precision={1}
                        max={4}
                        icon={<SentimentSatisfiedIcon fontSize="inherit" sx={{color:'orange'}}/>}
                        emptyIcon={<SentimentVerySatisfiedIcon fontSize="inherit" />}
                    /> <span> -- Low Risk </span>
                    </span>
                )
        case 4:  return( //healthy
                    <span style={{display:"inline-flex", justifyContent:"center"}}>
                    <StyledHealthinessBar
                        sx={{mx:1}}
                        readOnly
                        value={4-rating}
                        precision={1}
                        max={4}
                        icon={<SentimentVerySatisfiedIcon fontSize="inherit" sx={{color:'green'}}/>}
                        emptyIcon={<SentimentVerySatisfiedIcon fontSize="inherit" />}
                    /> <span> -- Healthy </span>
                    </span>
                )
    }
} 

export const CareTypeIcon=(careType:string)=>{
    switch(careType){
        case TreatmentCategory.Hospital: return <LocalHospitalIcon style={{color: 'red', paddingRight: "0.5rem"}} fontSize="large"/>
        case TreatmentCategory.OccupationalHealthcare: return <BadgeIcon style={{color: 'blue', paddingRight: "0.5rem"}} fontSize="large"/>
        case TreatmentCategory.HealthCheck: return <NoteAltIcon style={{color: 'orange', paddingRight: "0.5rem"}} fontSize="large"/>
        default: return <HelpCenterIcon style={{color: 'grey', paddingRight: "0.5rem"}}/>
    }
}

export const GenIcon=(p:Patient)=>{ 
    switch(p.gender){
        case "male": return <MaleIcon style={{ color:'blue', fontSize:"inherit"}}/>;
        case "female": return <FemaleIcon style={{ color: 'red' , fontSize:"inherit"}}/>;
        case "other": return <TransgenderIcon style={{ color: 'purple' , fontSize:"inherit"}}/>;
    }
}