import { useState, useEffect } from "react";
//import axios from "axios";
import Note from "./components/Note";
import noteService from "./services/notes";

const App = () => {
	const [notes, setNotes] = useState([]);
	const [newNote, setNewNote] = useState("add new note here");
	const [showAll, setShowAll] = useState(true);
	const notesToShow = showAll ? notes : notes.filter((n) => n.important === true);

	useEffect(() => {
		noteService.getAll().then((initialNotes) => {
			setNotes(initialNotes);
		});
	}, []);

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
			date: new Date(),
			important: Math.random() > 0.5,
		};
		noteService.create(noteObject).then((newNoteObject) => {
			setNotes(notes.concat(newNoteObject));
			setNewNote("");
		});
	};

	const handleNoteChange = (e) => {
		setNewNote(e.target.value);
	};

	const toggleImportanceOf = (id) => {
		const note = notes.find((n) => n.id === id);
		const changedNote = { ...note, important: !note.important };
		noteService
			.update(id, changedNote)
			.then((updatedNote) => {
				setNotes(notes.map((n) => (n.id === id ? updatedNote : n)));
			})
			.catch((err) => {
				alert(`the note id ${id} was already deleted from server`);
				setNotes(notes.filter((n) => n.id !== id));
			});
	};

	return (
		<div>
			<h1>Notes</h1>
			<button onClick={() => setShowAll(!showAll)}>Click To Show {showAll ? "Only Important Notes" : "All Notes"}</button>
			<ul>
				{notesToShow.map((n) => (
					<Note key={n.id} note={n} toggleImportance={() => toggleImportanceOf(n.id)} />
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
