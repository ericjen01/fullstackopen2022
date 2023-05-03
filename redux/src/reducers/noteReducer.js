const noteReducer = (state = [], action) => {
	switch (action.type) {
		case "NEW_NOTE":
			return [...state, action.payload];
		case "TOGGLE_IMPORTANCE":
			const id = action.payload.id;
			const noteToChange = state.find((n) => n.id === id);
			const changedNote = {
				...noteToChange,
				important: !noteToChange.important,
			};
			return state.map((note) => (note.id !== id ? note : changedNote));
		default:
			return state;
	}
};

const generateId = () => Number((Math.random() * 1000000).toFixed(0));

export const createNote = (content) => {
	return {
		type: "NEW_NOTE",
		payload: {
			content,
			important: false,
			id: generateId(),
		},
	};
};

export const toggleImportanceOf = (id) => {
	return {
		type: "TOGGLE_IMPORTANCE",
		payload: { id },
	};
};

export default noteReducer;

/* 6-a8:
const generateId = () => {
	Number((Math.random() * 1000000).toFixed(0));
};

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
	const addNote = (event) => {
		event.preventDefault();
		const content = event.target.note.value;
		event.target.note.value = "";
		store.dispatch(createNote(content));
	};

	const createNote = (content) => {
		return {
			type: "NEW_NOTE",
			payload: {
				content,
				important: false,
				id: generateId(),
			},
		};
	};

	const toggleImportance = (id) => {
		store.dispatch({
			type: "TOGGLE_IMPORTANCE",
			payload: { id },
		});
	};
	return (
		<div>
			<form onSubmit={addNote}>
				<input name="note" />
				<button tyape="submit">add</button>
			</form>
			<ul>
				{store.getState().map((note) => (
					<li key={note.id} onClick={() => toggleImportance(note.id)}>
						{note.content} <strong>{note.important ? "important" : ""}</strong>
					</li>
				))}
			</ul>
		</div>
	);
};

export default noteReducer;

*/

/*const root = ReactDOM.createRoot(document.getElementById("root"));
const renderApp = () => {
	root.render(<App />);
};
renderApp();
store.subscribe(renderApp);
*/
