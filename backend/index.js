const app = require("./app"); //the actual express app
const http = require("http");
const config = require("./utils/config");
const logger = require("./utils/logger");
const server = http.createServer(app);

server.listen(config.PORT, () => {
	logger.info(`server running on port ${config.PORT}`);
});

/*
require("dotenv").config();
const { response } = require("express");
const express = require("express");
const app = express();
const cors = require("cors");
const Note = require("./models/note");

const requestLogger = (request, response, next) => {
	console.log("Method:", request.method);
	console.log("Path:  ", request.path);
	console.log("Body:  ", request.body);
	console.log("---");
	next();
};

app.use(express.static("build"));
app.use(express.json());
app.use(requestLogger);
app.use(cors());



app.get("/api/notes", (req, res) => {
	Note.find({}).then((notes) => {
		res.json(notes);
	});
});

app.get("/api/notes/:id", (req, res, next) => {
	Note.findById(req.params.id)
		.then((note) => {
			if (note) {
				res.json(note);
			} else {
				res.status(404).end;
			}
		})
		.catch((error) => next(error));
});

app.delete("/api/notes/:id", (req, res, next) => {
	Note.findByIdAndDelete(req.params.id)
		.then((result) => {
			res.status(204).end;
		})
		.catch((err) => next(err));
});

app.post("/api/notes", (req, res) => {
	const body = req.body;
	if (body.content === undefined) {
		return res.status(400).json({
			error: "content missing",
		});
	}
	const note = new Note({
		content: body.content,
		important: body.important || false,
		date: new Date(),
	});
	note.save().then((savedNote) => {
		res.json(savedNote);
	});
});

app.put("/api/notes/:id", (req, res, next) => {
	const body = req.body;
	const note = {
		content: body.content,
		important: body.important,
	};
	Note.findByIdAndUpdate(req.params.id, note, { new: true })
		.then((updatedNote) => {
			res.json(updatedNote);
		})
		.catch((error) => next(error));
});

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: "unknown endpoint" });
};
app.use(unknownEndpoint);

const errorHandler = (error, req, res, next) => {
	console.error(error.message);

	if (error.name === "CastError") {
		return res.status(400).sned({ error: "malformatted" });
	}
	next(error);
};
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
*/
