export class ApiError extends Error {
  status;
  data;

  constructor(message, status, data) {
    super(message);
    this.status = status;
    this.data = data;
  }
}
