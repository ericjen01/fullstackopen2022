import { useDispatch, useSelector } from "react-redux";
import { toggleImportanceOf } from "../reducers/noteReducer";

const Note = ({ note, handleClick }) => {
	return (
		<li onClick={handleClick}>
			{note.content}
			<strong>{note.important ? "  important" : "  not important"}</strong>
		</li>
	);
};

const Notes = () => {
	const dispatch = useDispatch();

	/*console.log("state: ",useSelector(({ filter, notes }) => ({ filter, notes })));*/

	const notes = useSelector(({ filter, notes }) => {
		//console.log("components/Notes.js, filter: ", filter);
		//console.log("components/Notes.js, notes: ", notes);

		if (filter === "ALL") {
			console.log("components/Notes, ALL selected");
			return notes.filter((n) => n.content);
		} else {
			console.log("components/Notes, something else selected!");
			return filter === "IMPORTANT" ? notes.filter((n) => n.important) : notes.filter((n) => !n.important);
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
