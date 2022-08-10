const notesRouter = require("express").Router();
const Note = require("../models/note");

notesRouter.get("/", (req, res, nxt) => {
  Note.find({})
    .then((notes) => {
      res.json(notes);
    })
    .catch((err) => nxt(err));
});

notesRouter.get("/:id", (req, res, nxt) => {
  Note.findById(req.param.id)
    .then((note) => {
      if (note) {
        res.json(note);
      }
      res.status(404).end();
    })
    .catch((err) => nxt(err));
});

notesRouter.post("/", (req, res, nxt) => {
  if (req.body) {
    const note = new Note({
      content: req.body.content,
      important: req.body.important,
      date: new Date(),
    });

    note
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

notesRouter.put("/:id", (req, res, nxt) => {
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

notesRouter.delete("/:id", (req, res, nxt) => {
  Note.findByIdAndDelete(req.params.id)
    .then(() => res.status(204).end())
    .catch((err) => nxt(err));
});

module.exports = notesRouter;
