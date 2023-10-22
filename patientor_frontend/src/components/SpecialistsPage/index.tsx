import { BaseEntry } from "../../types";

interface Props {
    specialists : BaseEntry["specialist"][]
}

const speciaListsPage = (specialists: Props) => {
    return(
        <div>
            <ul>
                {Object.values(specialists)[0].map((s: string, i: number) => (
                    <li key={i}>{s}</li>
                ) 
                )}
            </ul>  
        </div>
    );
}

export default speciaListsPage;