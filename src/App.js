const App = () => {
	const t = [1, -1, 3];
	const t2 = t.concat("concat value");
	const t3 = [1, 2, 3, 4, 5];
	const [a, b, c, ...rest] = t3; //destructuring assignment
	const Ruberto = {
		name: "Reberto Fellas",
		age: 35,
		education: "hight school",
		greet: function () {
			console.log(`hello im ${this.name}, im ${this.age} years old`);
		},
		greet2: () => {
			console.log("yaya");
		},
	};

	t.push(5);
	Ruberto.greet();
	Ruberto.greet2();

	console.log("t.length: ", t.length); // 4 is printed
	console.log("t[1]: ", t[1]); // -1 is printed
	console.log("t2: ", t2); // array of t2 printed
	console.log("a, b, c: ", a, b, c); // prints destructured values 1, 2 ,3
	console.log("rest: ", rest); // prints the array of the rest of destructured value in the array

	t.forEach((value) => {
		console.log("map value: ", value); // numbers 1, -1, 3, 5 are printed, each to own line
	});

	class Person {
		constructor(name, age) {
			this.name = name;
			this.age = age;
		}
		greet() {
			console.log("hello, my name is " + this.name);
		}
	}
	const adam = new Person("Adam Ondra", 29);
	adam.greet();
	const janja = new Person("Janja Garnbret", 23);
	janja.greet();

	return;
};

export default App;
