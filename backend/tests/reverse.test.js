const reverse = require("../utils/for_testing").reverse;
const average = require("../utils/for_testing").average;

test("reverse of a", () => {
	const result = reverse("a");

	expect(result).toBe("a");
});
test("reverse of react", () => {
	const result = reverse("react");

	expect(result).toBe("tcaer");
});
test("reverse of releveler", () => {
	const result = reverse("releveler");

	expect(result).toBe("releveler");
});

describe("average", () => {
	test("of one value is the value itself", () => {
		expect(average([1])).toBe(1);
	});

	test("of many is calculated right", () => {
		expect(average([2, 3, 4, 5, 6])).toBe(4);
	});

	test("of empty array is zero", () => {
		expect(average([])).toBe(0);
	});
});
