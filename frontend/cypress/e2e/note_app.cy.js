describe("template spec", () => {
	it("passes", () => {
		cy.visit("https://example.cypress.io");
	});
});

describe("Note app", function () {
	it("front page can be opened", function () {
		cy.visit("");
		cy.contains("Notes");
		cy.contains("Note app, Department of Computer Science, University of Helsinki 2022");
	});
});

describe("Note app", function () {
	beforeEach(function () {
		cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
		const user = {
			name: "superuser",
			username: "root",
			password: "salainen",
		};
		cy.request("POST", `${Cypress.env("BACKEND")}/users`, user);
		cy.visit("");
	});
	it("front page can be opened", function () {
		cy.contains("Notes");
		cy.contains("Note app, Department of Computer Science, University of Helsinki 2022");
	});
	it("login form can be opened", function () {
		cy.contains("log in").click();
	});
	it("user can login", function () {
		cy.contains("log in").click();
		cy.get("#username").type("root");
		cy.get("#password").type("salainen");
		cy.get("#login-button").click();
		cy.contains("superuser logged in");
	});

	describe("when logged in", function () {
		beforeEach(function () {
			cy.request("POST", "http://localhost:3001/api/login", {
				username: "root",
				password: "salainen",
			}).then((response) => {
				localStorage.setItem("loggedNoteappUser", JSON.stringify(response.body));
				cy.visit("");
			});
		});

		it("a new note can be created", function () {
			cy.contains("new note").click();
			cy.get("#note-input").type("a note created by cypress");
			cy.contains("save").click();
			cy.contains("a note created by cypress");
		});

		describe("and a note exists", function () {
			beforeEach(function () {
				cy.createNote({
					content: "another note cypress",
					important: true,
				});
				//cy.contains("new note").click();
				//cy.get("input").type("another note cypress");
				//cy.contains("save").click();
			});
			it("it can be made not important", function () {
				cy.contains("another note cypress").contains("Mark Unimportant").click();
				cy.contains("another note cypress").contains("Mark Important");
			});
		});
	});

	it("login fails with wrong password", function () {
		cy.contains("log in").click();
		cy.get("#username").type("root");
		cy.get("#password").type("wrong");
		cy.get("#login-button").click();
		cy.get(".error").should("contain", "wrong credentials").and("have.css", "color", "rgb(255, 0, 0)").and("have.css", "border-style", "solid");
		cy.get("html").should("not.contain", "superuser logged in");
		cy.contains("superuser logged in").should("not.exist");
	});
});
