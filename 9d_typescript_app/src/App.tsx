import { JsxElement } from "typescript";

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

interface propType{
  courseName?: string, //"?" = optional
  content?: string, 
  count?:number,
  total?: number,
}

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