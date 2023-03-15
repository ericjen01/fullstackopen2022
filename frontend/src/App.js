import { useState, useEffect } from "react";
//import axios from "axios";
import Note from "./components/Note";
import noteService from "./services/notes";
import Notification from "./components/Notification";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";

const Footer = () => {
	const footerStyle = {
		color: "green",
		fontStyle: "italic",
		fontSize: 16,
	};
	return (
		<div style={footerStyle}>
			<br />
			<em>Note app, Department of Computer Science, University of Helsinki 2022</em>
		</div>
	);
};

const App = () => {
	const [notes, setNotes] = useState([]);
	const [newNote, setNewNote] = useState("add new note here");
	const [showAll, setShowAll] = useState(true);
	const [errorMessage, setErrorMessage] = useState(null);
	const notesToShow = showAll ? notes : notes.filter((n) => n.important === true);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [user, setUser] = useState(null);
	const [loginVisible, setLoginVisible] = useState(false);

	useEffect(() => {
		noteService.getAll().then((initialNotes) => {
			setNotes(initialNotes);
		});
	}, []);

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			setUser(user);
			noteService.setToken(user.token);
		}
		//window.localStorage.clear();
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
				setErrorMessage(`the note id ${id} was already deleted from server`);
				setTimeout(() => {
					setErrorMessage(null);
				}, 5000);
				setNotes(notes.filter((n) => n.id !== id));
			});
	};

	const handleLogin = async (event) => {
		event.preventDefault();
		try {
			const user = await loginService.login({
				username,
				password,
			});
			window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));

			noteService.setToken(user.token);
			setUser(user);
			setUsername("");
			setPassword("");
		} catch (exception) {
			setErrorMessage("Wrong credentials");
			setTimeout(() => {
				setErrorMessage(null);
			}, 5000);
		}
	};

	const loginForm = () => {
		const hideWhenVisible = { display: loginVisible ? "none" : "" };
		const showWhenVisible = { display: loginVisible ? "" : "none" };

		return (
			<div>
				<div style={hideWhenVisible}>
					<button onClick={() => setLoginVisible(true)}>log in</button>
				</div>
				<div style={showWhenVisible}>
					<LoginForm username={username} password={password} handleUsernameChange={({ target }) => setUsername(target.value)} handlePasswordChange={({ target }) => setPassword(target.value)} handleSubmit={handleLogin} />
					<button onClick={() => setLoginVisible(false)}>cancel</button>
				</div>
			</div>
		);
	};

	const noteForm = () => (
		<form onSubmit={addNote}>
			<input value={newNote} onChange={handleNoteChange} />
			<button type="submit">save</button>
		</form>
	);

	return (
		<div>
			<h1>Notes</h1>
			<Notification message={errorMessage} />
			{!user && loginForm()}
			{user && (
				<div>
					<p>{user.name} logged in </p>
					{noteForm()}
				</div>
			)}
			<div>
				<button onClick={() => setShowAll(!showAll)}> show {showAll ? "important" : "all"} </button>
			</div>
			<div>
				<ul>
					{notesToShow.map((note, i) => (
						<Note key={i} note={note} toggleImportance={() => toggleImportanceOf(note.id)} />
					))}
				</ul>
				<Footer />
			</div>
		</div>
	);
};

export default App;
