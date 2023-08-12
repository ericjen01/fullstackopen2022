export type Weather = 'sunny' | 'rainy' | 'cloudy' | 'windy' | 'stormy';

export type Visibility = 'great' | 'good' | 'ok' | 'poor';

export interface DiaryEntry{
    id:number,
    date: string,
    weather: Weather,
    visibility: Visibility,
    comment?: string
}


//refer to material 9C, Utility Types:
// Omit utility type is used to declare which fields to exclude
export type NewDiaryEntry = Omit<DiaryEntry, 'id'>
export type NonSensitiveDiaryEntry = Omit<DiaryEntry, 'comment'>


/*
Types are better for working with functions, complex types, etc. Interfaces work better with objects and method objects

function printLabel(labeledObj: { label: string }) {console.log(labeledObj.label); }
  function printLable has sigle parameter that requires the object passed in has a property called lable of type string.
  

interface LabeledValue {label: string;}
  interface named LabledValue is used to describe and as a requirement that the object passed in has a string type property called 'label'

function printLabel(labeledObj: LabeledValue) { console.log(labeledObj.label);}

let myObj = { size: 10, label: "Size 10 Object" };
printLabel(myObj);

  */