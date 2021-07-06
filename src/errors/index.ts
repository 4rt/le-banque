class BaseError extends Error {
  success: boolean;

  constructor(message: string, name = 'Error') {
    super();
    this.success = false;
    this.name = name;
    this.message = message;
  }
}

export class WrongArguments extends BaseError {
  constructor(message = 'Wrong arguments', name = 'WrongArguments') {
    super(message, name);
  }
}

export class UserAlreadyExists extends BaseError {
  constructor(message = 'User already exists', name = 'UserAlreadyExists') {
    super(message, name);
  }
}

export class UserDoesNotExist extends BaseError {
  constructor(message = 'User does not exists', name = 'UserDoesNotExist') {
    super(message, name);
  }
}

export class NotEnoughMoney extends BaseError {
  constructor(message = 'Not enough money', name = 'NotEnoughMoney') {
    super(message, name);
  }
}

export class SenderDoesNotExist extends BaseError {
  constructor(message = 'Sender does not exists', name = 'SenderDoesNotExist') {
    super(message, name);
  }
}

export class ReceiverDoesNotExist extends BaseError {
  constructor(message = 'Receiver does not exists', name = 'ReceiverDoesNotExist') {
    super(message, name);
  }
}
