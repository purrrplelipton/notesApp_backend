const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;

console.log("attempting connection to MongoDB");

mongoose
  .connect(url)
  .then(() => console.log("connection established"))
  .catch((err) => console.log("failed to connect to MongoDB", err));

const noteShcema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    minLength: [5, "note length is too short"],
  },
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
