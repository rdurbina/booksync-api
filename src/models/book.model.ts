import mongoose, { model } from "mongoose";

//Book schema
const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "The title field is mandatory"],
  },
  author: String,
  genre: String,
  publishedDate: Date,
  description: {
    type: String,
    required: [true, "The description field is mandatory"],
  },
  createdBy: String,
});

const Book = model("Book", bookSchema);

export default Book;
