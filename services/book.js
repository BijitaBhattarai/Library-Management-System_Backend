import Book from "../models/book.js";
import NotFoundError from "../error/not-found-error.js";
export const createBook = async (bookData) => {
  const book = await Book.create(bookData);
  return book;
};
export const getAllBooks = async () => {
  const book = await Book.find({ isDeleted: false });
  return book;
};
export const getBookById = async (bookId) => {
  const book = await Book.findOne({ _id: bookId, isDeleted: false });
  if (!book) {
    throw new NotFoundError("Book not found");
  }
  return book;
};
export const updateBookById = async (bookId, bookData) => {
  const book = await Book.findOneAndUpdate(
    { _id: bookId, isDeleted: false },
    bookData,
    { new: true, runValidators: true }
  );
  if (!book) {
    throw new NotFoundError("Book not found");
  }
  return book;
};
export const deleteBookById = async (bookId) => {
  const book = await Book.findOneAndDelete(
    { _id: bookId, isDeleted: false },
    { isDeleted: true },
    { new: true }
  );
  if (!book) {
    throw new NotFoundError("Book not found");
  }
};
