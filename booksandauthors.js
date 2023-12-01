const mongoose = require("mongoose");

const Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost:27017/test");

const authorSchema = Schema({
  name: { type: String, required: true },
  dob: { type: String, required: true }
});

const bookSchema = Schema({
  title: { type: String, required: true },
  pages: { type: Number, required: true },
  author: { type: authorSchema, required: true }
});

const Author = new mongoose.model("Author", authorSchema);
const Book = new mongoose.model("Book", bookSchema);

const john = new Author({
  name: "John Smith",
  dob: "01/01/1968"
});

const book = new Book({
  title: "A Book That Was",
  pages: 234,
  author: john
});

john.save();

book.save();