import { NewDiaryEntry } from "./types";

//Since the object is the body of a request, Express "object" typed it as any. (use 'unknown' to avoid complaint from eslint & typscript)
const toNewDiaryEntry = (object:unknown):NewDiaryEntry=>{ 
    const newEntry: NewDiaryEntry={
        weather: 'cloudy', // fake the return value
        visibility: 'great',
        date: '2022-1-1',
        comment: 'fake news'
    };
    return newEntry;
}

export default toNewDiaryEntry