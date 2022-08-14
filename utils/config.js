require("dotenv").config();

const PORT = process.env.PORT,
  URI = process.env.MONGODB_URI;

module.exports = { PORT, URI };
