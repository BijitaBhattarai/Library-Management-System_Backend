import Fine from "../models/fine.js";
import Issue from "../models/issue.js";
import NotFoundError from "../error/not-found-error.js";
import ConflictError from "../error/conflict-error.js";

const createFine = async ({ issueId, userId, amount }) => {
  // Check if the issue exists
  const issue = await Issue.findById(issueId);
  if (!issue) throw new NotFoundError("Issue record not found");

  // Check if book is overdue
  const today = new Date();
  if (issue.returnDate || today <= issue.dueDate) {
    throw new ConflictError("Fine can only be generated for overdue books");
  }

  //  Prevent duplicate fine for the same issue
  const existingFine = await Fine.findOne({ issue: issueId, user: userId });
  if (existingFine) {
    throw new ConflictError("Fine already exists for this issue");
  }

  //  Create the fine
  const fine = await Fine.create({
    issue: issueId,
    user: userId,
    amount,
  });

  return fine;
};

const payFine = async (fineId) => {
  const fine = await Fine.findById(fineId);
  if (!fine) throw new NotFoundError("Fine not found");

  if (fine.isPaid) {
    throw new ConflictError("Fine is already paid");
  }

  fine.isPaid = true;
  fine.paidAt = new Date();
  await fine.save();

  return fine;
};

const getAllFines = async () => {
  return Fine.find()
    .populate("user", "name email")
    .populate("issue", "book dueDate returnDate status");
};

const getFineById = async (fineId) => {
  const fine = await Fine.findById(fineId)
    .populate("user", "name email")
    .populate("issue", "book dueDate returnDate status");

  if (!fine) throw new NotFoundError("Fine not found");

  return fine;
};

const deleteFine = async (fineId) => {
  const fine = await Fine.findByIdAndDelete(fineId);
  if (!fine) throw new NotFoundError("Fine not found");
  return fine;
};

export { createFine, payFine, getAllFines, getFineById, deleteFine };
