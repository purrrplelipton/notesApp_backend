const mongoose = require("mongoose");

const noteShcema = new mongoose.Schema({
  content: { type: String, required: true, minLength: 5 },
  date: { type: Date, required: true },
  important: Boolean,
});

noteShcema.set("toJSON", {
  transform: (doc, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Note", noteShcema);
