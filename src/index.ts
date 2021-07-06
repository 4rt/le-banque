import { BankingError } from './errors/types';
import { IExBanking, Ok } from './types';
import BankingService from './services/BankingService';
import ErrorResponse from './models/ErrorResponse';
import OkResponse from './models/OkResponse';

// TODO: use builder for OkResponse
export class ExBanking implements IExBanking {
  public createUser(username: string): Ok | BankingError {
    console.log(`user created ${username}`);

    try {
      BankingService.createUser(username);

      return new OkResponse();
    } catch (error) {
      return new ErrorResponse(error);
    }
  }

  public deposit(
    username: string,
    amount: number,
    currency: string
  ): (Ok & { newBalance: number }) | BankingError {
    console.log(
      `deposit - username: ${username}, amount: ${amount}, currency: ${currency}`
    );

    try {
      BankingService.deposit(username, amount, currency);

      return {
        ...{ success: true },
        ...{ newBalance: 0 },
      };
    } catch (error) {
      return { success: false, message: error.message, name: 'Error' };
    }
  }

  public withdraw(
    username: string,
    amount: number,
    currency: string
  ): (Ok & { newBalance: number }) | BankingError {
    console.log(
      `withdraw - username: ${username}, amount: ${amount}, currency: ${currency}`
    );

    try {
      BankingService.withdraw(username, amount, currency);

      return {
        ...{ success: true },
        ...{ newBalance: 0 },
      };
    } catch (error) {
      return { success: false, message: error.message, name: 'Error' };
    }
  }

  public getBalance(
    username: string,
    currency: string
  ): (Ok & { balance: number }) | BankingError {
    console.log(`get balance - username: ${username}, currency: ${currency}`);

    try {
      BankingService.getBalance(username, currency);

      return {
        ...{ success: true },
        ...{ balance: 0 },
      };
    } catch (error) {
      return { success: false, message: error.message, name: 'Error' };
    }
  }

  public send(
    fromUsername: string,
    toUsername: string,
    amount: number,
    currency: string
  ):
    | (Ok & { fromUsernameBalance: number; toUsernameBalance: number })
    | BankingError {
    console.log(
      `send money - fromUsername: ${fromUsername}, toUsername: ${toUsername}, amount: ${amount}, currency: ${currency}`
    );

    try {
      BankingService.send(fromUsername, toUsername, amount, currency);

      return {
        ...{ success: true },
        ...{ fromUsernameBalance: 0 },
        ...{ toUsernameBalance: 0 },
      };
    } catch (error) {
      return { success: false, message: error.message, name: 'Error' };
    }
  }
}
