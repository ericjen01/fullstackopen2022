import diaries from "../../data/entries"
import { DiaryEntry } from "../types"

const getEntries = (): DiaryEntry[]=>{
    return diaries
}

const addDiary =()=>{
    return null
}

export default {
    getEntries,
addDiary
}


/*
import diaryData from "../../data/entries"
import { DiaryEntry } from "../types"  //DiaryEntry is an interface (also a type) that requires the object passed in has the properties of id:number, date: string, weather: Weather...etc

//const diaries that contains the type/interface DiaryEntry requirement are assigned the values from the data pool diaryData
//in other words, the data in diraryData are passed into the const diaries that has a type/interface DiaryEntry of an ARRAY of types
const diaries: DiaryEntry[] = diaryData as DiaryEntry[] //for "as DiaryEntry, look up 'type assertion' in 9C"
*/