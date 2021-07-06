import { ExBanking } from '../src';
import BankingService from '../src/services/BankingService';
import { UserDoesNotExist, WrongArguments } from '../src/errors';

describe('ExBanking', () => {
  describe('User interaction', () => {
    it('creates user', () => {
      const app = new ExBanking();
      const user = app.createUser('name');

      expect(user).toEqual({ success: true });
    });

    it('creates user throws WrongArguments exception', () => {
      const app = new ExBanking();
      const user = app.createUser('');

      expect(user).toEqual({
        success: false,
        message: 'Wrong arguments',
        name: 'WrongArguments',
      });
    });

    it('creates user throws UserAlreadyExists exception', () => {
      const app = new ExBanking();
      app.createUser('test');
      const user2 = app.createUser('test');

      expect(user2).toEqual({
        success: false,
        message: 'User already exists',
        name: 'UserAlreadyExists',
      });
    });
  });

  describe('Utils', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('gets user balance', () => {
      const app = new ExBanking();
      const getBalanceMock = jest.spyOn(BankingService, 'getBalance');

      getBalanceMock.mockImplementation(() => 1);

      const response = app.getBalance('name', 'USD');

      expect(getBalanceMock).toBeCalledTimes(1);
      expect(response).toEqual({ success: true, balance: 1 });
    });

    it('gets user balance throws WrongArguments exception', () => {
      const app = new ExBanking();
      const getBalanceMock = jest.spyOn(BankingService, 'getBalance');

      getBalanceMock.mockImplementation(() => {
        throw new WrongArguments();
      });

      const response = app.getBalance('name', 'USD');

      expect(getBalanceMock).toBeCalledTimes(1);
      expect(response).toEqual({
        success: false,
        message: 'Wrong arguments',
        name: 'WrongArguments',
      });
    });

    it('gets user balance throws UserDoesNotExist exception', () => {
      const app = new ExBanking();
      const getBalanceMock = jest.spyOn(BankingService, 'getBalance');

      getBalanceMock.mockImplementation(() => {
        throw new UserDoesNotExist();
      });

      const response = app.getBalance('name', 'USD');

      expect(getBalanceMock).toBeCalledTimes(1);
      expect(response).toEqual({
        success: false,
        message: 'User does not exists',
        name: 'UserDoesNotExist',
      });
    });

    it('gets user balance throws Error exception', () => {
      const app = new ExBanking();
      const getBalanceMock = jest.spyOn(BankingService, 'getBalance');

      getBalanceMock.mockImplementation(() => {
        throw new Error('something went wrong');
      });

      const response = app.getBalance('name', 'USD');

      expect(getBalanceMock).toBeCalledTimes(1);
      expect(response).toEqual({
        success: false,
        message: 'something went wrong',
        name: 'Error',
      });
    });
  });

  describe('Transaction', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('successfully deposits', () => {
      const app = new ExBanking();
      const depositMock = jest.spyOn(BankingService, 'deposit');

      depositMock.mockImplementation(() => 10);

      const response = app.deposit('name', 10, 'USD');

      expect(depositMock).toBeCalledTimes(1);
      expect(response).toEqual({ success: true, newBalance: 10 });
    });

    it('deposit throws WrongArguments exception', () => {
      const app = new ExBanking();
      const depositMock = jest.spyOn(BankingService, 'deposit');

      depositMock.mockImplementation(() => {
        throw new WrongArguments();
      });

      const response = app.deposit('', 0, '');

      expect(depositMock).toBeCalledTimes(1);
      expect(response).toEqual({
        success: false,
        message: 'Wrong arguments',
        name: 'WrongArguments',
      });
    });

    it('successfully withdraws', () => {
      const app = new ExBanking();
      const withdrawMock = jest.spyOn(BankingService, 'withdraw');

      withdrawMock.mockImplementation(() => 10);

      const response = app.withdraw('name', 10, 'USD');

      expect(withdrawMock).toBeCalledTimes(1);
      expect(response).toEqual({ success: true, newBalance: 10 });
    });

    it('withdraw throws BankingError exception', () => {
      const app = new ExBanking();
      const withdrawMock = jest.spyOn(BankingService, 'withdraw');

      withdrawMock.mockImplementation(() => {
        throw new WrongArguments();
      });

      const response = app.withdraw('', 0, '');

      expect(withdrawMock).toBeCalledTimes(1);
      expect(response).toEqual({
        success: false,
        message: 'Wrong arguments',
        name: 'WrongArguments',
      });
    });

    it('successfully sends money', () => {
      const app = new ExBanking();
      const sendMock = jest.spyOn(BankingService, 'send');

      sendMock.mockImplementation(() => ({
        fromUsernameBalance: 0,
        toUsernameBalance: 10,
      }));

      const response = app.send('name', 'name2', 10, 'USD');

      expect(sendMock).toBeCalledTimes(1);
      expect(response).toEqual({
        success: true,
        fromUsernameBalance: 0,
        toUsernameBalance: 10,
      });
    });

    it('send throws BankingError exception', () => {
      const app = new ExBanking();
      const sendMock = jest.spyOn(BankingService, 'send');

      sendMock.mockImplementation(() => {
        throw new WrongArguments();
      });

      const response = app.send('', '', 0, '');

      expect(sendMock).toBeCalledTimes(1);
      expect(response).toEqual({
        success: false,
        message: 'Wrong arguments',
        name: 'WrongArguments',
      });
    });
  });
});
