const Note = ({ note }) => {
	return (
		<li>
			{note.content} {note.important ? " (important)" : " (not important)"}
		</li>
	);
};

export default Note;
