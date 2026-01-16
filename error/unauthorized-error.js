class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
    this.statuscode = 401;
  }
}
export default UnauthorizedError;
