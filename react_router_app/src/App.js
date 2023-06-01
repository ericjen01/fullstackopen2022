/* eslint-disable jsx-a11y/anchor-is-valid */

import ReactDOM from "react-dom/client";
import { useState } from "react";

import { BrowserRouter as Router, Routes, Route, Link, Navigate, useParams, useNavigate, useMatch } from "react-router-dom";

const Home = () => (
	<div>
		<h2>TKTL notes app</h2>
		<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
	</div>
);

const Notes = ({ notes }) => (
	<div>
		<h2>Notes</h2>
		<ul>
			{notes.map((n) => (
				<li key={n.id}>
					<Link to={`/notes/${n.id}`}>{n.content}</Link>
				</li>
			))}
		</ul>
	</div>
);

const Note = ({ note }) => (
	<div>
		<h2>hello {note.content}</h2>
		<div>{note.user}</div>
		<div>
			<strong>{note.important ? "important" : "not important"}</strong>
		</div>
	</div>
);

const Users = () => (
	<div>
		<h2>TKTL notes app- users</h2>
		<ul>
			<li>Matti Luukkainen</li>
			<li>Juha Tauriainen</li>
			<li>Arto Hellas</li>
		</ul>
	</div>
);

const Login = (props) => {
	const navigate = useNavigate();

	const onSubmit = (e) => {
		e.preventDefault();
		props.onLogin("username");
		navigate("/users");
	};
	return (
		<div>
			<h2>login</h2>
			<form onSubmit={onSubmit}>
				<div>
					username: <input />
				</div>
				<div>
					password: <input type="password" />
				</div>
				<button type="submit">login</button>
			</form>
		</div>
	);
};

const App = () => {
	const [notes, setNotes] = useState([
		{
			id: 1,
			content: "HTML is easy",
			important: true,
			user: "Matti Luukkainen",
		},
		{
			id: 2,
			content: "Browser can execute only JavaScript",
			important: false,
			user: "Matti Luukkainen",
		},
		{
			id: 3,
			content: "Most important methods of HTTP-protocol are GET and POST",
			important: true,
			user: "Arto Hellas",
		},
	]);

	const [user, setUser] = useState(null);
	const match = useMatch("/notes/:id");

	//console.log(match);
	//console.log(notes);
	//console.log(notes.find((n) => n.id === Number(match.params.id)));

	const note = match ? notes.find((n) => n.id === Number(match.params.id)) : null;
	const login = (user) => {
		setUser(user);
	};
	const padding = {
		padding: 5,
	};

	return (
		<div>
			<div>
				<Link style={padding} to="/">
					home
				</Link>

				<Link style={padding} to="/notes">
					notes
				</Link>

				<Link style={padding} to="/users">
					users
				</Link>

				{user ? (
					<em>{user} logged in</em>
				) : (
					<Link style={padding} to="/login">
						login
					</Link>
				)}
			</div>
			<Routes>
				<Route path="/notes/:id" element={<Note note={note} />} />
				<Route path="/notes" element={<Notes notes={notes} />} />
				<Route path="/users" element={user ? <Users /> : <Navigate replace to="/login" />} />
				<Route path="/login" element={<Login onLogin={login} />} />
				<Route path="/" element={<Home />} />
			</Routes>
		</div>
	);
};

ReactDOM.createRoot(document.getElementById("root")).render(
	<Router>
		<App />
	</Router>
);

/* 7-a2
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
//import { useState } from "react";

const Home = () => (
	<div>
		<h2>TKTL notes app</h2>
	</div>
);

const Notes = () => (
	<div>
		<h2>Notes</h2>
	</div>
);

const Users = () => (
	<div>
		<h2>Users</h2>
	</div>
);

const App = () => {
	const padding = {
		padding: 5,
	};

	return (
		<Router>
			<div>
				<Link style={padding} to="/">
					home
				</Link>
				<Link style={padding} to="/notes">
					homes
				</Link>
				<Link style={padding} to="/users">
					users
				</Link>
			</div>

			<Routes>
				<Route path="/notes" element={<Notes />} />
				<Route path="/users" element={<Users />} />
				<Route path="/" element={<Home />} />
			</Routes>

			<div>
				<i>Note app, Department of Computer Science 2023</i>
			</div>
		</Router>
	);
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

*/

/*  7-a1
const Home = () => (
	<div>
		<h2>TKTL notes app</h2>
	</div>
);

const Notes = () => (
	<div>
		<h2>Notes</h2>
	</div>
);

const Users = () => (
	<div>
		<h2>Users</h2>
	</div>
);

const App = () => {
	const [page, setPage] = useState("home");

	const toPage = (page) => (e) => {
		e.preventDefault();
		console.log(`${page} clicked`);
		setPage(page);
		console.log("page now is: ", { page });
	};

	const content = () => {
		if (page === "home") {
			console.log("going Home");
			return <Home />;
		} else if (page === "notes") {
			console.log("going Notes");
			return <Notes />;
		} else if (page === "users") {
			console.log("going ");
			return <Users />;
		}
	};

	const padding = {
		padding: 5,
	};

	return (
		<div>
			<div>
				<a href="" onClick={toPage("home")} style={padding}>
					home
				</a>
				<a href="" onClick={toPage("notes")} style={padding}>
					notes
				</a>
				<a href="" onClick={toPage("users")} style={padding}>
					users
				</a>
			</div>
			{content()}
		</div>
	);
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
*/
