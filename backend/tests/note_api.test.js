const supertest = require("supertest");
const mongoose = require("mongoose");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);
const bcrypt = require("bcrypt");
const User = require("../models/user");
const Note = require("../models/note");

describe("when there is initially some notes saved", () => {
	beforeEach(async () => {
		await Note.deleteMany({});
		await Note.insertMany(helper.initialNotes);
	});

	test("notes are returned as json", async () => {
		await api
			.get("/api/notes")
			.expect(200)
			.expect("Content-Type", /application\/json/);
	}, 10000);

	test("all notes are returned", async () => {
		const response = await api.get("/api/notes");

		expect(response.body).toHaveLength(helper.initialNotes.length);
	}, 10000);

	test("a specific note is within the returned notes", async () => {
		const response = await api.get("/api/notes");

		const contents = response.body.map((r) => r.content);
		expect(contents).toContain("Browser can execute only JavaScript");
	}, 10000);

	describe("viewing a specific note", () => {
		test("succeeds with a valid id", async () => {
			const notesAtStart = await helper.notesInDb();
			const noteToView = notesAtStart[0];
			const resultNote = await api
				.get(`/api/notes/${noteToView.id}`)
				.expect(200)
				.expect("Content-Type", /application\/json/);

			expect(resultNote.body).toEqual(noteToView);
		});

		test("fails with statuscode 404 if note does not exist", async () => {
			const validNonexistId = await helper.nonExistId();
			await api.get(`/api/notes/${validNonexistId}`).expect(404);
		}, 10000);

		test("fails with statuscode 400 id is invalid", async () => {
			const invalidId = "5a3d5da59070081a82a3445";

			await api.get(`/api/notes/${invalidId}`).expect(400);
		});
	});

	describe("addition of a new note", () => {
		test("succeeds with valid data", async () => {
			const newNote = {
				content: "async/await simplifies making async calls",
				important: true,
			};

			await api
				.post("/api/notes")
				.send(newNote)
				.expect(201)
				.expect("Content-Type", /application\/json/);

			const notesAtEnd = await helper.notesInDb();
			expect(notesAtEnd).toHaveLength(helper.initialNotes.length + 1);

			const contents = notesAtEnd.map((n) => n.content);
			expect(contents).toContain("async/await simplifies making async calls");
		});

		test("fails with status code 400 if data invalid", async () => {
			const newNote = {
				important: true,
			};

			await api.post("/api/notes").send(newNote).expect(400);

			const notesAtEnd = await helper.notesInDb();

			expect(notesAtEnd).toHaveLength(helper.initialNotes.length);
		});
	});

	describe("deletion of a note", () => {
		test("succeeds with status code 204 if id is valid", async () => {
			const notesAtStart = await helper.notesInDb();
			const noteToDelete = notesAtStart[0];

			await api.delete(`/api/notes/${noteToDelete.id}`).expect(204);

			const notesAtEnd = await helper.notesInDb();

			expect(notesAtEnd).toHaveLength(helper.initialNotes.length - 1);

			const contents = notesAtEnd.map((r) => r.content);

			expect(contents).not.toContain(noteToDelete.content);
		});
	});
});

describe("when theres initially one user in db", () => {
	beforeEach(async () => {
		await User.deleteMany({});
		const passwordHash = await bcrypt.hash("sekret", 10);
		const user = new User({ username: "root", passwordHash });
		await user.save();
	});
	test("creation suceeds with a fresh username", async () => {
		const usersAtStart = await helper.usersInDb();
		const newUser = {
			username: "lulu",
			name: "matt lulu",
			password: "saladea",
		};
		await api
			.post("/api/users")
			.send(newUser)
			.expect(201)
			.expect("Content-Type", /application\/json/);

		const usersAtEnd = await helper.usersInDb();
		expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

		const usernames = usersAtEnd.map((u) => u.username);
		expect(usernames).toContain(newUser.username);
	});

	test("creation fails w/ proper statuscode & message if username already taken", async () => {
		const usersAtStart = await helper.usersInDb();
		const newUser = {
			username: "root",
			name: "superuser",
			password: "salainen",
		};
		const result = await await api
			.post("/api/users")
			.send(newUser)
			.expect(400)
			.expect("Content-Type", /application\/json/);
		expect(result.body.error).toContain("expected `username` to be unique");
		const usersAtEnd = await helper.usersInDb();
		expect(usersAtStart).toEqual(usersAtEnd);
	});
});

afterAll(async () => {
	await mongoose.connection.close();
});
