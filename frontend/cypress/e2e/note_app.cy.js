describe("template spec", () => {
	it("passes", () => {
		cy.visit("https://example.cypress.io");
	});
});

describe("Note app", function () {
	it("front page can be opened", function () {
		cy.visit("http://localhost:3000");
		cy.contains("Notes");
		cy.contains("Note app, Department of Computer Science, University of Helsinki 2022");
	});
});

describe("Note app", () => {
	it("front page can be opened", () => {
		cy.visit("http://localhost:3000");
		cy.contains("Notes");
		cy.contains("Note app, Department of Computer Science, University of Helsinki 2022");
	});
});

describe("Note app", function () {
	it("login form can be opened", function () {
		cy.visit("http://localhost:3000");
		cy.contains("log in").click();
	});
});

describe("Note app", function () {
	beforeEach(function () {
		cy.visit("http://localhost:3000");
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
		cy.contains("Superuser logged in");
	});
});
