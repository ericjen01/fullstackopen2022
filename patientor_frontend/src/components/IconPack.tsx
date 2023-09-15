import {Patient } from "../types";
import { Rating } from "@mui/material";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import BadgeIcon from '@mui/icons-material/Badge';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import { styled } from '@mui/material/styles';

const StyledHealthinessBar = styled(Rating)({
    iconFilled: {
        color: "#ff6d75",
      },
      iconHover: {
        color: "#ff3d47",
      }
})
export const HealithinessBar = (rating:number|any) => {
    return(
        <span>
            <StyledHealthinessBar
                readOnly
                value={rating}
                precision={0.1}
                max={4}
                icon={<EmojiEmotionsIcon fontSize="inherit" />}
                emptyIcon={<EmojiEmotionsIcon fontSize="inherit" />}
            />
        </span>
    )
} 

export const CareTypeIcon=(careType:string)=>{
    switch(careType){
        case "Hospital": return <LocalHospitalIcon style={{color: 'red', paddingRight: "0.5rem"}}/>
        case "OccupationalHealthcare": return <BadgeIcon style={{color: 'blue', paddingRight: "0.5rem"}}/>
        case "HealthCheck": return <NoteAltIcon style={{color: 'orange', paddingRight: "0.5rem"}}/>

        default: return <HelpCenterIcon style={{color: 'grey', paddingRight: "0.5rem"}}/>
    }
}

export const GenIcon=(p:Patient)=>{
    switch(p.gender){
        case "male": return <MaleIcon style={{ color: 'blue' }}/>;
        case "female": return <FemaleIcon style={{ color: 'red' }}/>;
        case "other": return <TransgenderIcon style={{ color: 'pink' }}/>;
    }
}