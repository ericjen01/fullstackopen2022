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
