import { createSlice } from "@reduxjs/toolkit";
import noteService from "../services/notes";

/*const initialState = [
	{
		content: "reducer define how redux store works",
		important: true,
		id: 1,
	},
	{
		content: "state of store can contain any data",
		important: false,
		id: 2,
	},
];*/

//const generateId = () => Number((Math.random() * 1000000).toFixed(0));

const noteSlice = createSlice({
	name: "notes",
	initialState: [],
	reducers: {
		/*createNote(state, action) {
			state.push(action.payload);
		},*/

		toggleImportanceOf(state, action) {
			const id = action.payload;
			const noteToChange = state.find((n) => n.id === id);
			const changedNote = {
				...noteToChange,
				important: !noteToChange.important,
			};
			/****************** console.log("state: ", JSON.stringify(state)); *******************/
			/****************** console.log("state: ", JSON.parse(JSON.stringify(state))); *******************/
			return state.map((note) => (note.id !== id ? note : changedNote));
		},

		appendNote(state, action) {
			state.push(action.payload);
		},

		setNotes(state, action) {
			return action.payload;
		},
	},
});

export const initializeNotes = () => {
	return async (dispatch) => {
		const notes = await noteService.getAll();
		dispatch(setNotes(notes));
	};
};

export const createNote = (content) => {
	return async (dispatch) => {
		const newNote = await noteService.createNew(content);
		dispatch(appendNote(newNote));
	};
};

export const { toggleImportanceOf, appendNote, setNotes } = noteSlice.actions;

export default noteSlice.reducer;

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
