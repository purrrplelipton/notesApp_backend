require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const Note = require("./models/note");

const logger = (req, res, nxt) => {
  console.log("METHOD", req.method);
  console.log("PATH", req.path);
  console.log("BODY", req.body);
  console.log("___");
  nxt();
};

app.use(express.static("build"));
app.use(bodyParser.json());
app.use(logger);

app.get("/api/notes", (req, res, nxt) => {
  Note.find({})
    .then((notes) => {
      res.json(notes);
    })
    .catch((err) => nxt(err));
});

app.get("/api/notes/:id", (req, res, nxt) => {
  Note.findById(req.param.id)
    .then((note) => {
      if (note) {
        res.json(note);
      }
      res.status(404).end();
    })
    .catch((err) => nxt(err));
});

app.post("/api/notes", (req, res, nxt) => {
  if (req.body) {
    const note = new Note({
      content: req.body.content,
      important: req.body.important === "important",
      date: new Date(),
      id: req.body.id,
    });

    console.log(note);

    return note
      .save()
      .then((savedNote) => {
        res.json(savedNote);
      })
      .catch((err) => nxt(err));
  }
  res.status(400).json({
    error: "content missing",
  });
});

app.put("/api/notes/:id", (req, res, nxt) => {
  const { content, important } = req.body;

  Note.findByIdAndUpdate(
    req.params.id,
    { content, important },
    { new: true, runValidators: true, context: "query" }
  )
    .then((updatedNote) => {
      res.json(updatedNote);
    })
    .catch((err) => nxt(err));
});

app.delete("/api/notes/:id", (req, res, nxt) => {
  Note.findByIdAndDelete(req.params.id)
    .then(() => res.status(204).end())
    .catch((err) => nxt(err));
});

const unknownEndpoint = (req, res) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (err, req, res, nxt) => {
  console.error(err);

  if (err.name === "CastError") {
    response.status(400).send({ error: "malformatted id" });
  } else if (err.name === "ValidationError") {
    res.status(400).json({ error: err.message });
  }

  nxt(err);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("server running on port", PORT);
});
