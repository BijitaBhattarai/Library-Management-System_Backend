import { Router } from "express";
import USER_ROUTER from "./user.js";
import BOOK_ROUTER from "./book.js";
import AUTH_ROUTER from "./auth.js";
import ISSUE_ROUTER from "./issue.js";
import RESERVATION_ROUTER from "./reservation.js";
import FINE_ROUTER from "./fine.js";

const HANDLERS = Router();
HANDLERS.use("/user", USER_ROUTER);
HANDLERS.use("/book", BOOK_ROUTER);
HANDLERS.use("/issues", ISSUE_ROUTER);
HANDLERS.use("/reservation", RESERVATION_ROUTER);
HANDLERS.use("/fine", FINE_ROUTER);
HANDLERS.use("/auth", AUTH_ROUTER);

export default HANDLERS;
