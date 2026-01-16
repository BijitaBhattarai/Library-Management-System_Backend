import Book from "../models/book.js";
import NotFoundError from "../error/not-found-error.js";
import ConflictError from "../error/conflict-error.js";
import Issue from "../models/issue.js";

const issueBook = async ({ userId, bookId, dueDate }) => {
  const alreadyIssued = await Issue.findOne({
    user: userId,
    book: bookId,
    status: { $ne: "RETURNED" },
  });

  if (alreadyIssued) {
    throw new ConflictError(
      "You have already issued this book. Please return it first."
    );
  }
  const book = await Book.findById(bookId);
  if (!book) throw new NotFoundError("Book not found");

  if (book.availableCopies <= 0) {
    throw new ConflictError("Book not available");
  }

  const issue = await Issue.create({
    user: userId,
    book: bookId,
    dueDate,
  });

  // Reduce book stock
  book.availableCopies -= 1;
  await book.save();

  return issue;
};

const returnBook = async (issueId) => {
  const issue = await Issue.findById(issueId);
  if (!issue) throw new NotFoundError("Issue record not found");

  if (issue.status === "RETURNED") {
    throw new ConflictError("Book already returned");
  }

  issue.status = "RETURNED";
  issue.returnDate = new Date();
  await issue.save();

  // Increase book stock
  const book = await Book.findById(issue.book);
  if (book) {
    book.availableCopies += 1;
    await book.save();
  }

  return issue;
};

const getAllIssues = async () => {
  return await Issue.find()
    .populate("user", "name email")
    .populate("book", "title author");
};

const getIssueById = async (issueId) => {
  const issue = await Issue.findById(issueId)
    .populate("user", "name email")
    .populate("book", "title author");

  if (!issue) throw new NotFoundError("Issue record not found");

  return issue;
};

export { issueBook, returnBook, getAllIssues, getIssueById };
