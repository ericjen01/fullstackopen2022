import diaries from "../../data/entries"
import { DiaryEntry, NonSensitiveDiaryEntry, NewDiaryEntry } from "../types"

const getEntries = (): DiaryEntry[]=>{
    return diaries
}

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[]=>{ //refer to material 9C, Utility Types:
    // TypeScript only checks whether we have all of the required fields or not, but excess fields are not prohibited. Because TypeScript doesn't modify the actual data but only its type, we need to exclude the fields ourselves (9C, utility types):
   // console.log("* diaries.map.id: ", diaries.map(d=>d.id))
    //console.log("* （...diaries.map.id): ", ...diaries.map(d=>d.id))
    return diaries.map(({id, date, weather, visibility})=>({
        id,
        date,
        weather,
        visibility
    }))
}

const addDiary =( entry:NewDiaryEntry): DiaryEntry=>{
    const newDiaryEntry ={
        //map(d=>d.id) returns an array of dairies ids, three dot notation (spread/rest operator)"..." turns the array 
        id: Math.max(...diaries.map(d=>d.id)) +1,
       ...entry
    }

    diaries.push(newDiaryEntry)
    return newDiaryEntry
}

const findById =(id:number):DiaryEntry|undefined =>{
    const entry = diaries.find(d=>d.id===id)
    return entry
}

export default {
    getEntries,
addDiary,
getNonSensitiveEntries,
findById
}


/*
import diaryData from "../../data/entries"
import { DiaryEntry } from "../types"  //DiaryEntry is an interface (also a type) that requires the object passed in has the properties of id:number, date: string, weather: Weather...etc

//const diaries that contains the type/interface DiaryEntry requirement are assigned the values from the data pool diaryData
//in other words, the data in diraryData are passed into the const diaries that has a type/interface DiaryEntry of an ARRAY of types
const diaries: DiaryEntry[] = diaryData as DiaryEntry[] //for "as DiaryEntry, look up 'type assertion' in 9C"
*/