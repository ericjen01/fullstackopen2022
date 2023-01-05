import { useState } from "react";

const History = (props) => {
	if (props.allClicks.length === 0) {
		return <div>the app is used by pressing the buttons</div>;
	}
	return <div>button press history: {props.allClicks.join(", ")}</div>;
};

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>;

const App = () => {
	const [left, setLeft] = useState(0);
	const [right, setRight] = useState(0);
	const [clicks, setClicks] = useState({ left: 0, right: 0 });
	const [clicks2, setClicks2] = useState({ left: 0, right: 0 });
	const [allClicks, setAll] = useState([]);
	const [clicks4, setClicks4] = useState({ left: 0, right: 0 });

	const doLeftClick = () => {
		const newClicks = {
			left: clicks.left + 1,
			right: clicks.right,
		};
		setClicks(newClicks);
	};
	const doRightClick = () => {
		const newClicks = {
			left: clicks.left,
			right: clicks.right + 1,
		};
		setClicks(newClicks);
	};

	const doLeftClick2 = () => setClicks2({ ...clicks2, left: clicks2.left + 1 });
	const doRightClick2 = () => setClicks2({ ...clicks2, right: clicks2.right + 1 });

	const doLeftClick3 = () => {
		setAll(allClicks.concat("L"));
		setLeft(left + 1);
	};
	const doRightClick3 = () => {
		setAll(allClicks.concat("R"));
		setRight(right + 1);
	};

	const doLeftClick4 = () => setClicks4({ ...clicks4, left: clicks4.left + 1 });
	const doRightClick4 = () => setClicks4({ ...clicks4, right: clicks4.right + 1 });

	return (
		<div>
			<div>
				{left}
				<button onClick={() => setLeft(left + 1)}>left</button>
				<button onClick={() => setRight(right + 1)}>right</button>
				{right}
			</div>
			<div>
				{clicks.left}
				<button onClick={doLeftClick}>left</button>
				<button onClick={doRightClick}>right</button>
				{clicks.right}
			</div>
			<div>
				{clicks2.left}
				<button onClick={doLeftClick2}>left</button>
				<button onClick={doRightClick2}>right</button>
				{clicks2.right}
			</div>
			<div>
				<History allClicks={allClicks} />
				{left}
				<button onClick={doLeftClick3}>left</button>
				<button onClick={doRightClick3}>right</button>
				{right}
			</div>
			<div>
				{clicks4.left}
				<Button handleClick={doLeftClick4} text="left" />
				<Button handleClick={doRightClick4} text="right" />
				{clicks4.right}
			</div>
		</div>
	);
};

export default App;
