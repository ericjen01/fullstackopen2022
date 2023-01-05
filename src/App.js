import { useState } from "react";

const Hello = ({ name, age }) => {
	//const name = props.name;
	//const age = props.age;
	//const { name, age } = props; destructing instead of assigning the props to constants
	const bornYear = () => new Date().getFullYear() - age;

	return (
		<div>
			<p>
				Hello {name}, you are {age} years old
			</p>
			<p>You were born in {bornYear()}</p>
		</div>
	);
};

const Display = (props) => {
	return <div>{props.clickCount}</div>;
};

const Button = ({ onClick, text }) => {
	return <button onClick={onClick}>{text}</button>;
};

const App = () => {
	const name = "peter";
	const age = 10;

	const [counter, setCounter] = useState(0);
	const [clickCount, setClickCount] = useState(0);
	const increaseByOne = () => setClickCount(clickCount + 1);
	const setToZero = () => setClickCount(0);
	const handleClick = () => console.log("clicked");

	setTimeout(() => setCounter(counter + 1), 1000);
	//console.log("component is rendered by the setTimeout ", counter);

	return (
		<div>
			<h1>Greetings</h1>
			<Hello name="Maya" age={26 + 10} />
			<Hello name={name} age={age} />
			<h1>Counter: {counter}</h1>
			<button onClick={handleClick}>click</button>
			<button onClick={() => setCounter(0)}>set to zero</button>
			<div>
				<h1>Click Count: {clickCount}</h1>
				<button onClick={increaseByOne}>plus</button>
				<button onClick={setToZero}>zero</button>
			</div>
			<h1>
				<Display clickCount={clickCount} />
				<Button onClick={setToZero} text="zero" />
				<Button onClick={increaseByOne} text="increase +1" />
			</h1>
		</div>
	);
};

export default App;
