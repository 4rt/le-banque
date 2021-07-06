import { BankingError } from './errors/types';
import { IExBanking, Ok } from './types';
import BankingService from './services/BankingService';
import ErrorResponse from './models/ErrorResponse';
import OkResponse from './models/OkResponse';

// TODO: use builder for OkResponse
export class ExBanking implements IExBanking {
  public createUser(username: string): Ok | BankingError {
    try {
      BankingService.createUser(username);

      return new OkResponse();
    } catch (error) {
      return new ErrorResponse(error);
    }
  }

  public getBalance(
    username: string,
    currency: string
  ): (Ok & { balance: number }) | BankingError {
    try {
      const balance = BankingService.getBalance(username, currency) as number;

      return {
        ...new OkResponse(),
        ...{ balance },
      };
    } catch (error) {
      return new ErrorResponse(error);
    }
  }

  public deposit(
    username: string,
    amount: number,
    currency: string
  ): (Ok & { newBalance: number }) | BankingError {
    try {
      const newBalance = BankingService.deposit(
        username,
        amount,
        currency
      ) as number;

      return {
        ...new OkResponse(),
        ...{ newBalance },
      };
    } catch (error) {
      return new ErrorResponse(error);
    }
  }

  public withdraw(
    username: string,
    amount: number,
    currency: string
  ): (Ok & { newBalance: number }) | BankingError {
    try {
      const newBalance = BankingService.withdraw(
        username,
        amount,
        currency
      ) as number;

      return {
        ...new OkResponse(),
        ...{ newBalance },
      };
    } catch (error) {
      return new ErrorResponse(error);
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
    try {
      const { fromUsernameBalance, toUsernameBalance } = BankingService.send(
        fromUsername,
        toUsername,
        amount,
        currency
      ) as { fromUsernameBalance: number; toUsernameBalance: number };

      return {
        ...new OkResponse(),
        ...{ fromUsernameBalance },
        ...{ toUsernameBalance },
      };
    } catch (error) {
      return new ErrorResponse(error);
    }
  }
}
