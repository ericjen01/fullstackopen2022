
//import { useState } from "react";

const Note = ({ note }) => <li>from Note function: {note.content}</li>;

const App = ({ notes }) => {
	//const { notes } = props;
	const result = notes.map((n) => n.id);
	console.log(result);
	console.log(notes.map((n) => n.content));

	return (
		<div>
			<h1>Notes</h1>
			<ul>
				{notes.map((n) => (
					<li key={n.id}>{n.content}</li>
				))}
			</ul>
			<ul>
				{notes.map((n, i) => (
					<li key={i}>
						{i + ": "}
						{n.content}
					</li>
					//i is assigned the index value of position in the array
				))}
			</ul>
			<ul>
				{notes.map((n) => (
					<Note note={n} />
				))}
			</ul>

		</div>
	);
};

export default App;
