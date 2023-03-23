import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import NoteForm from "./NoteForm";
import userEvent from "@testing-library/user-event";

test("<NoteFrom /> updates parent state and calls onSubmit", async () => {
	const createNote = jest.fn();
	const user = userEvent.setup();
	render(<NoteForm createNote={createNote} />);

	const input = screen.getByRole("textbox");
	const sendButton = screen.getByText("save", { exact: false });

	await user.type(input, "testing a form...");
	await user.click(sendButton);

	expect(createNote.mock.calls).toHaveLength(1);
	expect(createNote.mock.calls[0][0].content).toBe("testing a form...");
});

test("<NoteFrom/> updates parent state and calls onSubmit", async () => {
	const createNote = jest.fn();
	const user = userEvent.setup();
	render(<NoteForm createNote={createNote} />);

	const input = screen.getByPlaceholderText("write note content here");
	const sendButton = screen.getByText("save", { exact: false });

	await user.type(input, "testing a form...");
	await user.click(sendButton);

	expect(createNote.mock.calls).toHaveLength(1);
	expect(createNote.mock.calls[0][0].content).toBe("testing a form...");
});
