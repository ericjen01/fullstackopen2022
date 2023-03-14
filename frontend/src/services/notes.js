import axios from "axios";
const baseUrl = "/api/notes";

let token = null;

const setToken = (newToken) => {
	token = `Bearer ${newToken}`;
};

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

const create = async (newObject) => {
	const config = {
		headers: { Authorization: token },
	};
	const response = await axios.post(baseUrl, newObject, config);
	return response.data;
};

const update = (id, newObject) => {
	const req = axios.put(`${baseUrl}/${id}`, newObject);
	return req.then((res) => res.data);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, update, setToken };
