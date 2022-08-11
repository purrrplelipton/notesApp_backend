const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as an argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://toby:${password}@cluster0.bm9qe.mongodb.net/noteApp?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true });

const Note = mongoose.model("Note", {
  content: {
    type: String,
    required: true,
    minLength: [5, "note length is too short"],
  },
  date: { type: Date, required: true },
  important: Boolean,
});

const note = new Note({
  content: process.argv[3],
  important: process.argv[4] === "true",
});

if (false) {
  note.save().then((nt) => {
    console.log("note saved successfully");
    mongoose.connection.close();
  });
}

Note.find({}).then((note) => {
  note.forEach((n) => console.log(n));
  mongoose.connection.close();
});
