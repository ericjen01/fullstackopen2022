import React from "react";
import ReactDOM from "react-dom/client";
import { createStore } from "redux";

const noteReducer = (state = [], action) => {
	switch (action.type) {
		case "NEW_NOTE":
			return state.concat(action.payload);

		case "TOGGLE_IMPORTANCE": {
			const id = action.payload.id;
			const noteToChage = state.find((n) => n.id === id);
			const changedNote = { ...noteToChage, important: !noteToChage.important };
			return state.map((note) => (note.id !== id ? note : changedNote));
		}
		default:
			return state;
	}

	return state;
};
const store = createStore(noteReducer);

const App = () => {
	return (
		<div>
			<ul>
				{store.getState().map((note) => (
					<li key={note.id}>
						{note.content} <strong>{note.important ? "important" : ""}</strong>
					</li>
				))}
			</ul>
		</div>
	);
};

export default noteReducer;

/*const root = ReactDOM.createRoot(document.getElementById("root"));
const renderApp = () => {
	root.render(<App />);
};
renderApp();
store.subscribe(renderApp);
*/
