export default class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor); // что бы приходило в консоль стак ошибки
  }
}

// как будто нихуя не понял
//error это родительсий класс который уже существеут джава скрпитом
