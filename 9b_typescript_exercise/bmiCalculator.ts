

interface InputValues{
    val1:number,
    val2:number
}

const parseArguements = (args :string[]):InputValues=>{
    if(args.length<4)throw new Error('not enough args')
    if(args.length>4)throw new Error('too many args provided')
    if( !isNaN(Number(args[2])) && !isNaN(Number(args[3]))){
        return{
            val1: Number(args[2]),
            val2: Number(args[3])
        }
    }else throw new Error('args provided are not numbers!')
}

const calculateBmi =(height:number, weight: number, printResult:string)=>{
    console.log(printResult, weight/(height^2))
}

try{
    const {val1,val2} = parseArguements(process.argv)
    calculateBmi(val1,val2, `your height ${val1}, wieght ${val2}. your bmi is normal: `)
}catch(error: unknown){
    let errMessage = 'something is wrong'
    if(error instanceof Error){
        errMessage=+ " Error: " + error.message
    }console.log(errMessage)
}

