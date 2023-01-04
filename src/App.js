const Hello = (prop) => {
	return (
		<div>
			<p>HELLO HELLO</p>
			<p>{prop.name}</p>
		</div>
	);
};

const App = () => {
	const now = new Date();
	const name = "Peter";
	const a = 10;
	const b = 20;

	return (
		<div>
			<Hello />
			<p>Hello world, it is {now.toString()}</p>
			<p>
				{a} plus {b} is {a + b}
			</p>
			<Hello name={name} />
		</div>
	);
};

export default App;
