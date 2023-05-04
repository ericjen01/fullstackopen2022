import React from "react";
import ReactDOM from "react-dom/client";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import App from "./App";
import noteReducer from "./reducers/noteReducer";
import filterReducer from "./reducers/filterReducer";
import { createNote } from "./reducers/noteReducer";
import { filterChange } from "./reducers/filterReducer";

const reducer = combineReducers({
	notes: noteReducer,
	filter: filterReducer,
});
const store = createStore(reducer);
/*console.log("store:", store);
console.log("store.getState():", store.getState());
console.log("store.getState().notes:", store.getState().notes);
console.log("store.notes:", store.notes);
*/

store.subscribe(() => console.log(store.getState()));
store.dispatch(filterChange("IMPORTANT"));
store.dispatch(createNote("combineReducers forms one reducer from many simple reducers"));

ReactDOM.createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<App />
	</Provider>
);

/* 6-a2:
const counterReducer = (state = 0, action) => {
	switch (action.type) {
		case "INCREMENT":
			return state + 1;
		case "DECREMENT":
			return state - 1;
		case "ZERO":
			return 0;
		default:
			return state;
	}
};

const store = createStore(counterReducer);

const App = () => {
	return (
		<div>
			<div>{store.getState()}</div>
			<button onClick={(e) => store.dispatch({ type: "INCREMENT" })}>plus</button>
			<button onClick={(e) => store.dispatch({ type: "DECREMENT" })}>minus</button>
			<button onClick={(e) => store.dispatch({ type: "ZERO" })}>zero</button>
		</div>
	);
};

const root = ReactDOM.createRoot(document.getElementById("root"));
const renderApp = () => {
	root.render(<App />);
};
renderApp();
store.subscribe(renderApp);
 */
