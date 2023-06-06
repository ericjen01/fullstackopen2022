/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import ReactDOM from "react-dom/client";
import { useState } from "react";

const useCounter = () => {
	const [value, setValue] = useState(0);
	const increase = () => {
		setValue(value + 1);
	};
	const decrease = () => {
		setValue(value - 1);
	};
	const zero = () => {
		setValue(0);
	};

	return {
		value,
		increase,
		decrease,
		zero,
	};
};

const useField = (type) => {
	const [entered_value, setValue] = useState("");

	const onChange = (event) => {
		setValue(event.target.value);
	};

	return {
		type,
		entered_value,
		onChange,
	};
};

const App = () => {
	const counter = useCounter();
	const left = useCounter();
	const rite = useCounter();

	//const [name, setName] = useState("");
	//const [born, setBorn] = useState("");
	//const [height, setHeight] = useState("");

	const namex = useField("text");
	const born = useField("date");
	const height = useField("number");

	return (
		<div>
			<div>{counter.value}</div>
			<button onClick={counter.increase}>plus</button>
			<button onClick={counter.decrease}>minus</button>
			<button onClick={counter.zero}>zero</button>
			<div>left: {left.value}</div>
			<div>rite: {rite.value}</div>
			<button onClick={left.increase}>left</button>
			<button onClick={rite.increase}>rite</button>

			<div>
				<form>
					name: <input {...namex} />
					born: <input {...born} />
					height: <input {...height} />
				</form>
				<div>
					{namex.entered_value} {born.entered_value} {height.entered_value}
				</div>
			</div>
		</div>
	);
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
