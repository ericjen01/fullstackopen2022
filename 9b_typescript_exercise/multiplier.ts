/*type Operation = 'multiply' | 'add' | 'divide';
type Result = number|string

const calculator = (a: number, b: number, op: Operation): Result => {
switch (op){
    case 'multiply':return a*b
    case 'add': return a+b
    case 'divide': if(b===0) throw new Error("this can't be done");return a/b
    default: throw new Error('this operation failed')
}
}

const multiplicator = (a: number, b:number, printText:string)=>{
    console.log(printText, a*b)
}
const a: number = Number(process.argv[1])
console.log(process.argv[2])
const b: number = Number(process.argv[3])
console.log(process.argv[3])

console.log(calculator(4,5,'add'))
try {
    console.log(calculator(1, 5 , 'divide'));
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong: '
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    console.log(errorMessage);
  }
  console.log(process.argv)

  multiplicator(a, b, `Multiplied ${a} and ${b}, the result is:`);
  */

  interface MultiplyValues {
    value1: number;
    value2: number;
  }
  // note "let values: Array<number>"  is equivalent to "let values: number[]"
  //(args: string[]) used when one wants to give command line string arguements
  //function parseArguments usese interface MultiplyValues to pass data args of a string array
  const parseArguments = (args: string[]): MultiplyValues => {
    if (args.length < 4) throw new Error('Not enough arguments');//if length of the array args < 4
    if (args.length > 4) throw new Error('Too many arguments');
  
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
      return {
        value1: Number(args[2]),
        value2: Number(args[3]),
      }
    } else {
      throw new Error('Provided values were not numbers!');
    }
  }
  //console.log("*parseArguements: ", parseArguments)
  
  const multiplicator = (a: number, b: number, printText: string) => {
    console.log(printText,  a * b);
  }
  
  try {
    const { value1, value2 } = parseArguments(process.argv);
    multiplicator(value1, value2, `Multiplied ${value1} and ${value2}, the result is:`);
   // console.log("* process.argv: ", process.argv)
   // console.log("* parseArguement(process.argv): ", parseArguments(process.argv))
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }