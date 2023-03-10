const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const User = require("../models/user");

loginRouter.get("/", async (request, response) => {
	const login = request.body;
	console.log("landing to login page");
	response.status(200).json(login);
});

loginRouter.post("/", async (request, response) => {
	const { username, password } = request.body;
	console.log("user: " + { username }, "password: " + { password });
	console.log({ username });

	const user = await User.findOne({ username });
	console.log(user);
	const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.passwordHash);

	if (!(user && passwordCorrect)) {
		return response.status(401).json({
			error: "invalid username or password",
		});
	}

	const userForToken = {
		username: user.username,
		id: user._id,
	};

	const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 60 * 60 });

	response.status(200).send({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;
/*
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const User = require("../models/user");
const { response } = require("express");

loginRouter.post("/", async (req, res) => {
	const { username, password } = req.body;

	const user = await User.findOne({ username }); //search for user from Db by requested username
	const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.passwordHash);

	if (!(user && passwordCorrect)) {
		return response.status(401).json({
			error: "invalid username or password",
		});
	}

	const userForToken = {
		username: user.username,
		id: user._id,
	};
	//if password & user infor correct, jtw.sign creates a token containing username & id
	//token is digitally signed using a string from the env variable SECRET as the secret
	//value for the en variable must be set in the .env file
	const token = jwt.sign(userForToken, process.env.SECRET); // we have to add SECRET to .env. it can be any string

	res.status(200).send({ token, username: user.username, name: user.name }); //generated token, username & user sent back in the res body
});

module.exports = loginRouter; //this entire code in login.js has to be added to the app.js
*/
