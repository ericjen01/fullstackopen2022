import { NewDiaryEntry, Weather, Visibility } from "./types";

// this validation function is also so called 'type guard'. "text is string" is the type predicate
//A predicate takes the form parameterName is Type, where parameterName must be the name of a parameter from the current function signature.
const isString =(text: unknown): text is string=>{ 
    return typeof text==='string'|| text instanceof String //why use two conditions that look almost the same? look up "Side note: testing if something is a string in 9C, type guards"
}

//function gets a parameter of type unknown, returns it as type string if it exists & the right type
const parseComment = (comment: unknown): string =>{
    if(!comment||!isString(comment)){// isString is an user-created validation function in this file
        throw new Error("incorrect or missing comment: " + comment)
    }
    return comment
}

const isDate = (date: string): boolean => { //note we don't use type predicate here. see 9C for reason
    return Boolean(Date.parse(date))
}
const parseDate = (date: unknown ): string =>{
    if(!date || !isString(date) || !isDate(date)){
        throw new Error("incorrect or missing date: " + date);
    }
    return date
}
  

//Instead of a type alias, we should use the TypeScript enum, which allows us to use the actual values in our code at runtime, not only in the compilation phase    
const isWeather= (param:string): param is Weather=>{
    return Object.values(Weather).map(v => v.toString()).includes(param);
}
const parseWeather = (weather: unknown): Weather => {
    if (!weather || !isString(weather) || !isWeather(weather)) {
        throw new Error('Incorrect or missing weather: ' + weather);
    }
    return weather;
  };


  const isVisibility = (param: string): param is Visibility => {
    return Object.values(Visibility).map(v => v.toString()).includes(param);
  };
  const parseVisibility = (visibility: unknown): Visibility => {
    // check !visibility removed:
    if (!isString(visibility) || !isVisibility(visibility)) {
        throw new Error('Incorrect visibility: ' + visibility);
    }
    return visibility;
  };


//Since the object is the body of a request, Express "object" typed it as any. (use 'unknown' to avoid complaint from eslint & typscript)
const toNewDiaryEntry = (object:unknown):NewDiaryEntry=>{ 
    //typeguard 1: checks if the parameter object exists and it has the type object
    if ( !object || typeof object !== 'object' ) {  
        throw new Error('Incorrect or missing data');
      }

      //typeguard 2: uses the in operator to ensure if the object has all the desired fields
      if ('comment' in object && 'date' in object && 'weather' in object && 'visibility' in object)  {
        const newEntry: NewDiaryEntry = {
          weather: parseWeather(object.weather),
          visibility: parseVisibility(object.visibility),
          date: parseDate(object.date),
          comment: parseComment(object.comment)
        };

    return newEntry;
    }
    throw new Error('Incorrect data: some fields are missing');

}

export default toNewDiaryEntry