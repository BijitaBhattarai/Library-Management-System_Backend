class ConflictError extends Error {
  constructor(message = "Conflict occurred") {
    super(message);
    this.name = "ConflictError";
    this.statusCode = 409;
  }
}

export default ConflictError;
