import { BaseEntry } from "../../types"
interface Props {
    diagnosisCodes : BaseEntry["specialist"][]
}

const DiagnosisCodesPage = (diagnosisCodes: Props) => {
    return(
        <div>
            <ul>
                {Object.values(diagnosisCodes)[0].map((s: string, i: number) => (
                    <li key={i}>{s}</li>
                ) 
                )}
            </ul>  
        </div>
    );
}

export default DiagnosisCodesPage;