import { useEffect } from "react";
import Notes from "./components/Notes";
import NewNote from "./components/NewNote";
import VisibilityFilter from "./components/VisibilityFilter";
//import noteService from "./services/notes";
import { initializeNotes } from "./reducers/noteReducer";
import { useDispatch } from "react-redux";

const App = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(initializeNotes());
	}, [dispatch]);

	/*  
		useEffect(() => {
    	dispatch(initializeNotes())  
  		}, [dispatch]) 
	*/

	return (
		<div>
			<NewNote />
			<VisibilityFilter />
			<Notes />
		</div>
	);
};

export default App;

/* 6-a8: Forwarding Redux Store to various components:

import { createNote, toggleImportanceOf } from "./reducers/noteReducer";
import { useSelector, useDispatch } from "react-redux";

const App = () => {
	const dispatch = useDispatch();
	const notes = useSelector((state) => state);

	const addNote = (event) => {
		event.preventDefault();
		const content = event.target.note.value;
		event.target.note.value = "";
		dispatch(createNote(content));
	};

	const toggleImportance = (id) => {
		dispatch(toggleImportanceOf(id));
	};

	return (
		<div>
			<form onSubmit={addNote}>
				<input name="note" />
				<button type="submit">add</button>
			</form>
			<ul>
				{notes.map((note) => (
					<li key={note.id} onClick={() => toggleImportance(note.id)}>
						{note.content} <strong>{note.important ? "important" : ""}</strong>
					</li>
				))}
			</ul>
		</div>
	);
};

export default App;

*/
