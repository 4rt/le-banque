import BankingService from '../src/services/BankingService';
import UsersDao from "../src/daos/UsersDao";

describe('BankingService', () => {
  describe('Service class instance', () => {
    it('has one instance', () => {
      // @ts-ignore
      expect(() => new BankingService()).toThrow();
    })
  });

  describe('User creation', () => {
    beforeEach(() => {
      UsersDao.users = [];
    });

    it('creates user', () => {
      const createdUser = BankingService.createUser('newName');

      expect(createdUser).toEqual('newName');
    })

    it('creates user throws WrongArguments exception', () => {
      // @ts-ignore
      expect(() => BankingService.createUser()).toThrow('Wrong arguments');
      expect(() => BankingService.createUser('')).toThrow('Wrong arguments');
    })

    it('creates user throws UserAlreadyExists exception', () => {
      BankingService.createUser('newName');
      expect(() => BankingService.createUser('newName')).toThrow('User already exists');
    })
  });

  describe('User balance', () => {
    beforeEach(() => {
      UsersDao.users = [
        {
          userName: 'test',
          balance: [
            {
              currency: 'USD',
              amount: 10,
            },
          ],
        }
      ];
    });

    it('gets balance', () => {
      const balance = BankingService.getBalance('test', 'USD');

      expect(balance).toBe(10);
    })

    it('throws WrongArguments exception', () => {
      // @ts-ignore
      expect(() => BankingService.getBalance()).toThrow('Wrong arguments')
      // @ts-ignore
      expect(() => BankingService.getBalance('')).toThrow('Wrong arguments')
      // @ts-ignore
      expect(() => BankingService.getBalance('', '')).toThrow('Wrong arguments')
      // @ts-ignore
      expect(() => BankingService.getBalance('test')).toThrow('Wrong arguments')
      // @ts-ignore
      expect(() => BankingService.getBalance('test', '')).toThrow('Wrong arguments')
      // @ts-ignore
      expect(() => BankingService.getBalance('', 'USD')).toThrow('Wrong arguments')
      // @ts-ignore
      expect(() => BankingService.getBalance(null, undefined)).toThrow('Wrong arguments')
    })

    it('throws UserDoesNotExist exception', () => {
      expect(() => BankingService.getBalance('yolo', 'RUB')).toThrow('User does not exists')
    })
  });

  describe('Transactions', () => {
    beforeEach(() => {
      UsersDao.users = [
        {
          userName: 'test',
          balance: [
            {
              currency: 'USD',
              amount: 10,
            },
          ],
        },
        {
          userName: 'test2',
          balance: [
            {
              currency: 'USD',
              amount: 10,
            },
          ],
        }
      ];
    });

    it('deposits amount of currency', () => {
      const newBalance = BankingService.deposit('test', 20, 'USD');

      expect(newBalance).toBe(30);
    })

    it('deposit throws WrongArguments exception', () => {
      // @ts-ignore
      expect(() => BankingService.deposit()).toThrow('Wrong arguments')
      // @ts-ignore
      expect(() => BankingService.deposit('')).toThrow('Wrong arguments')
      // @ts-ignore
      expect(() => BankingService.deposit('', '')).toThrow('Wrong arguments')
      // @ts-ignore
      expect(() => BankingService.deposit('test')).toThrow('Wrong arguments')
      // @ts-ignore
      expect(() => BankingService.deposit('test', '')).toThrow('Wrong arguments')
      // @ts-ignore
      expect(() => BankingService.deposit('', 'USD')).toThrow('Wrong arguments')
      // @ts-ignore
      expect(() => BankingService.deposit(null, undefined)).toThrow('Wrong arguments')
      // @ts-ignore
      expect(() => BankingService.deposit('test', -10)).toThrow('Wrong arguments')
      // @ts-ignore
      expect(() => BankingService.deposit('test', 0)).toThrow('Wrong arguments')
    })

    it('throws UserDoesNotExist exception', () => {
      expect(() => BankingService.deposit('yolo', 10000,'RUB')).toThrow('User does not exists')
    })

    it('withdraws amount of currency', () => {
      const newBalance = BankingService.withdraw('test', 1, 'USD');

      expect(newBalance).toBe(9);
    })

    it('withdraw throws WrongArguments exception', () => {
      // @ts-ignore
      expect(() => BankingService.withdraw()).toThrow('Wrong arguments')
      // @ts-ignore
      expect(() => BankingService.withdraw('')).toThrow('Wrong arguments')
      // @ts-ignore
      expect(() => BankingService.withdraw('', '')).toThrow('Wrong arguments')
      // @ts-ignore
      expect(() => BankingService.withdraw('test')).toThrow('Wrong arguments')
      // @ts-ignore
      expect(() => BankingService.withdraw('test', '')).toThrow('Wrong arguments')
      // @ts-ignore
      expect(() => BankingService.withdraw('', 'USD')).toThrow('Wrong arguments')
      // @ts-ignore
      expect(() => BankingService.withdraw(null, undefined)).toThrow('Wrong arguments')
      // @ts-ignore
      expect(() => BankingService.withdraw('test', -10)).toThrow('Wrong arguments')
      // @ts-ignore
      expect(() => BankingService.withdraw('test', 0)).toThrow('Wrong arguments')
    })

    it('sends money', () => {
      // @ts-ignore
      const { fromUsernameBalance, toUsernameBalance } = BankingService.send('test', 'test2', 1, 'USD');

      expect(fromUsernameBalance).toBe(9);
      expect(toUsernameBalance).toBe(11);
    })
  })
});
