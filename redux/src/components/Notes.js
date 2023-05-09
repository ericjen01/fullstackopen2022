import { useDispatch, useSelector } from "react-redux";
import { toggleImportanceOf } from "../reducers/noteReducer";

const Note = ({ note, handleClick }) => {
	return (
		<li onClick={handleClick}>
			{JSON.stringify(note.content)}
			<strong>{note.important ? "  important" : "  not important"}</strong>
		</li>
	);
};

const Notes = () => {
	const dispatch = useDispatch();

	/*console.log("state: ",useSelector(({ filter, notes }) => ({ filter, notes })));*/

	const notes = useSelector((state) => {
		console.log("components/Notes.js, filter: ", state.filter);
		console.log("components/Notes.js, notes: ", state.notes);

		if (state.filter === "ALL") {
			console.log("components/Notes, ALL selected");
			console.log("Notes.js: ALL selected notes: ", state.notes);
			console.log("Notes.js: ALL selected notes.content: ", state.notes.content);
			return state.notes;
		} else {
			console.log("components/Notes, something else selected!");
			return state.filter === "IMPORTANT" ? state.notes.filter((n) => n.important) : state.notes.filter((n) => !n.important);
			console.log("Notes.js: important/unimportant notes: ", state.filter === "IMPORTANT" ? state.notes.filter((n) => n.important) : state.notes.filter((n) => !n.important));
		}
	});

	return (
		<ul>
			{notes.map((note) => (
				<Note key={note.id} note={note} handleClick={() => dispatch(toggleImportanceOf(note.id))} />
			))}
		</ul>
	);
};

export default Notes;
