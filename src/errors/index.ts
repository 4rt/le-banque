class BaseError extends Error {
  success: boolean;

  constructor(name = 'Error') {
    super();
    this.success = false;
    this.name = name;
  }
}

export class WrongArguments extends BaseError {
  constructor(message = 'Wrong arguments') {
    super();
    this.message = message;
  }
}

export class UserAlreadyExists extends Error {
  constructor(message = 'User already exists') {
    super();
    this.message = message;
  }
}

export class UserDoesNotExist extends Error {
  constructor(message = 'User does not exists') {
    super();
    this.message = message;
  }
}

export class NotEnoughMoney extends Error {
  constructor(message = 'Not enough money') {
    super();
    this.message = message;
  }
}

export class SenderDoesNotExist extends Error {
  constructor(message = 'Sender does not exists') {
    super();
    this.message = message;
  }
}

export class ReceiverDoesNotExist extends Error {
  constructor(message = 'Receiver does not exists') {
    super();
    this.message = message;
  }
}
