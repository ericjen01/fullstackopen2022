import { JsxElement } from "typescript";

const App = () => {
  const courseName = "Half Stack application development";

  const courseParts:CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    },
  ]

interface propType{
  courseName?: string, //"?" = optional
  content?: string, 
  count?:number,
  total?: number,
}
interface CoursePartBase{
  name: string;
  exerciseCount: number;
}
interface CoursePartBasic extends CoursePartBase  {
  description: string;
  kind: "basic"
}
interface CoursePartGroup extends CoursePartBase{
  groupProjectCount: number;
  kind: "group"
}
interface CoursePartBackground extends CoursePartBase{
  description: string;
  backgroundMaterial: string;
  kind: "background"
}
type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground;


//search "exhaust type checking" in 9-c5
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};


courseParts.forEach(p=>{
  switch(p.kind){
    case "basic": console.log(p.name, p.description, p.exerciseCount); break;
    case "group": console.log(p.name, p.exerciseCount, p.groupProjectCount); break;
    case "background": console.log(p.description, p.backgroundMaterial ); break;
    //default: break;
    default: return assertNever(p); break;
  }
})

  const Header =(props:propType )=>{
   return <h2>{props.courseName}</h2>
  }
  const Content = (props: propType) =>{
    return <p>{props.content}, score: {props.count}</p>
  }
 const Total = (props:propType)=>{
  return <h4>Total Credit: {props.total}</h4> 
 }

  return (
<div>
  <Header courseName={courseName}/>
  <Content content={courseParts[0].name} count={courseParts[0].exerciseCount}/> 
  <Total total={courseParts[0].exerciseCount}/>
</div>
  
    
  );
};

export default App;