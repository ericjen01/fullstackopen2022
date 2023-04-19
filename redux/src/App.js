import React from "react";
import { useState } from "react";
import { createStore } from "redux";

const App = () => {
	//const [counter, setCounter] = useState(0);
	const counterReducer = (state = 0, action) => {
		switch (action.type) {
			case "INCREMENT":
				return state + 1;
			case "DECREMENT":
				return state - 1;
			case "ZERO":
				return 0;
			default: // if none of the above matches, code comes here
				return state;
		}
	};
	const store = createStore(counterReducer);

	store.subscribe(() => {
		const storeNow = store.getState();
		console.log("store now: ", storeNow);
	});

	store.dispatch({ type: "INCREMENT" });
	store.dispatch({ type: "INCREMENT" });
	store.dispatch({ type: "INCREMENT" });
	store.dispatch({ type: "ZERO" });
	store.dispatch({ type: "DECREMENT" });

	return (
		<div>
			<div></div>
			<div></div>
		</div>
	);
};

export default App;
