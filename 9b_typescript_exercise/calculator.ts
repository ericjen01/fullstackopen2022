interface InputVal{
    val1:number,
    val2:number
}

const parseArgs = (args: string[]): InputVal=>{
    if (args.length<4) throw new Error("not enough args");
    if (args.length>4) throw new Error("too many args");
    if(!isNaN(Number(args[2])) && !isNaN(Number(args[3]))){
        return {val1:Number(args[2]), val2:Number(args[3])}
    }
      else throw new Error("values provided are not numbers");
}

export const calculate = (a:number, b:number, showText:string)=>{
    console.log(showText, a*b)
}

try{
    const {val1,val2}= parseArgs(process.argv);
    calculate(val1,val2,`${val1} times ${val2} equals: `)
}catch (err: unknown){
    let errMessage = "something is wrong"
    if(err instanceof Error){
        errMessage =+ " Error: " + err.message
    }
    console.log(errMessage)
}

