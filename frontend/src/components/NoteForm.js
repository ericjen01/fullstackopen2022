const NoteForm = ({ onSubmit, handleChange, value }) => {
	return (
		<div>
			<h2>Create a New Note</h2>
			<form onSubmit={onSubmit}>
				<input value={value} onChange={handleChange} />
				<button type="submit">save</button>
			</form>
		</div>
	);
};

export default NoteForm;
