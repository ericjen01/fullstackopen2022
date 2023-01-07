const Note = ({ note, toggleImportance }) => {
	const label = note.important ? "Mark Unimportant" : "Mark Important";
	return (
		<li className="note">
			{note.content} {note.important ? " (important) " : " (not important) "}
			<button onClick={toggleImportance}>{label}</button>
		</li>
	);
};

export default Note;
