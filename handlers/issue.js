import Router from "express";
const ISSUE_ROUTER = Router();
import {
  issueBook,
  returnBook,
  getAllIssues,
  getIssueById,
} from "../services/issue.js";
import {
  CreateIssueValidator,
  UpdateIssueValidator,
} from "../validators/issueValidator.js";
import useValidator from "../middleware/useValidator.js";

ISSUE_ROUTER.post(
  "/",
  useValidator(CreateIssueValidator),
  async (req, res, next) => {
    try {
      const issue = await issueBook({
        userId: req.user.userId,
        bookId: req.body.bookId,
        dueDate: req.body.dueDate,
      });
      res.status(201).json(issue);
    } catch (error) {
      next(error);
    }
  }
);

ISSUE_ROUTER.patch(
  "/:issueId/return",
  useValidator(UpdateIssueValidator),
  async (req, res, next) => {
    try {
      const issue = await returnBook(req.params.issueId);
      res.status(200).json(issue);
    } catch (error) {
      next(error);
    }
  }
);

ISSUE_ROUTER.get("/", async (req, res, next) => {
  try {
    const issues = await getAllIssues();
    res.status(200).json(issues);
  } catch (error) {
    next(error);
  }
});

ISSUE_ROUTER.get("/:issueId", async (req, res, next) => {
  try {
    const issue = await getIssueById(req.params.issueId);
    res.status(200).json(issue);
  } catch (error) {
    next(error);
  }
});

export default ISSUE_ROUTER;
