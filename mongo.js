const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('give password as an argument');
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://toby:${password}@cluster0.bm9qe.mongodb.net/noteApp?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true });

const Note = mongoose.model('Note', {
  content: { type: String, required: true, min: 5 },
  date: { type: Date, required: true },
  important: Boolean,
});

const note = new Note({
  content: process.argv[3],
  date: new Date(),
  important: process.argv[4] === 'true',
});

if (process.argv.length === 5) {
  note.save().then(() => {
    console.log('note saved successfully');
    mongoose.connection.close();
  });
} else if (process.argv.length === 3) {
  Note.find({}).then((note) => {
    note.forEach((n) => console.log(n));
    mongoose.connection.close();
  });
} else {
  console.log('something went wrong');
}
