import axios from "axios";
const baseUrl = "http://localhost:3001/notes";

const getAll = () => {
	const req = axios.get(baseUrl);

	const dummyNote = {
		id: 1000,
		content: "*it's a dummy note concat-ed for error testing, dne in server database*",
		date: new Date(),
		important: true,
	};
	//return req.then((res) => res.data);
	return req.then((res) => res.data.concat(dummyNote));
};

const create = (newObject) => {
	const req = axios.post(baseUrl, newObject);
	return req.then((res) => res.data);
};

const update = (id, newObject) => {
	const req = axios.put(`${baseUrl}/${id}`, newObject);
	return req.then((res) => res.data);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, update };
