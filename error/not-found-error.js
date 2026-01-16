class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
    this.statuscode = 404;
  }
}
export default NotFoundError;
