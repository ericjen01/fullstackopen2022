const Note = ({ note, toggleImportance }) => {
	const label = note.important ? "Mark Unimportant" : "Mark Important";
	return (
		<li className="note">
			{note.content}
			<span>{note.important ? " (important) " : " (not important) "}</span>
			<button onClick={toggleImportance}>{label}</button>
		</li>
	);
};

export default Note;
