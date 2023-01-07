import { useState, useEffect } from "react";
import axios from "axios";
import Note from "./components/Note";

const App = () => {
	const [notes, setNotes] = useState([]);
	const [newNote, setNewNote] = useState("add new note here");
	const [showAll, setShowAll] = useState(true);

	useEffect(() => {
		console.log("effect");
		axios.get("http://localhost:3001/notes").then((response) => {
			console.log("promise fulfilled");
			setNotes(response.data);
		});
	}, []);

	const addNote = (e) => {
		e.preventDefault();
		const noteObject = {
			content: newNote,
			date: new Date().toISOString,
			important: Math.random() < 0.5,
			id: notes.length + 1,
		};
		setNotes(notes.concat(noteObject));
		setNewNote("");
	};

	const handleNoteChange = (e) => {
		setNewNote(e.target.value);
	};

	const notesToShow = showAll ? notes : notes.filter((n) => n.important === true);

	return (
		<div>
			<h1>Notes</h1>
			<button onClick={() => setShowAll(!showAll)}>Click To Show {showAll ? "Only Important Notes" : "All Notes"}</button>
			<ul>
				{notesToShow.map((n) => (
					<Note key={n.id} note={n} />
				))}
			</ul>
			<form onSubmit={addNote}>
				<input value={newNote} onChange={handleNoteChange} />
				<button type="submit">save</button>
			</form>
		</div>
	);
};

export default App;
