import {
    NotEnoughMoney,
    ReceiverDoesNotExist,
    SenderDoesNotExist,
    UserAlreadyExists,
    UserDoesNotExist,
    WrongArguments
} from './index';

export type BankingError = Error |
    WrongArguments |
    UserAlreadyExists |
    UserDoesNotExist |
    NotEnoughMoney |
    SenderDoesNotExist |
    ReceiverDoesNotExist;