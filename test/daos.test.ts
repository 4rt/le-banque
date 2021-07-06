import UsersDao from '../src/daos/UsersDao';

describe('UsersDao', () => {
  describe('Dao class instance', () => {
    it('has one instance', () => {
      // @ts-ignore
      expect(() => new UsersDao()).toThrow();
      expect(UsersDao.users).toHaveLength(0);
      UsersDao.createUser('test name');
      UsersDao.createUser('test name2');
      expect(UsersDao.users).toHaveLength(2);
    });

    afterAll(() => {
      UsersDao.users = [];
    });
  });

  describe('Utils', () => {
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
      ];
    });

    it('checks weather money amount on balance is enough', () => {
      expect(UsersDao.enoughMoney('test', 9.01, 'USD')).toBeTruthy();
      expect(UsersDao.enoughMoney('test', 10, 'USD')).toBeTruthy();
      expect(UsersDao.enoughMoney('test', 11, 'USD')).toBeFalsy();
      expect(UsersDao.enoughMoney('test', 11.02, 'USD')).toBeFalsy();
      expect(UsersDao.enoughMoney('test', 9.999, 'USD')).toBeTruthy();
    });

    it('checks if a user already exists', () => {
      expect(UsersDao.userExists('test')).toBeTruthy();
      expect(UsersDao.userExists('Test')).toBeFalsy();
      expect(UsersDao.userExists('test ')).toBeFalsy();
      expect(UsersDao.userExists(' test ')).toBeFalsy();
      expect(UsersDao.userExists(' test')).toBeFalsy();
    });

    afterAll(() => {
      UsersDao.users = [];
    });
  });

  describe('Creates user', () => {
    beforeEach(() => {
      UsersDao.users = [];
    });

    it('creates user', () => {
      UsersDao.createUser('test name');

      expect(UsersDao.users).toHaveLength(1);
    });

    it('sets default balance and currency', () => {
      UsersDao.createUser('test name2');

      expect(UsersDao.users).toEqual([
        {
          balance: [{ amount: 0, currency: 'unknown' }],
          userName: 'test name2',
        },
      ]);
    });

    afterAll(() => {
      UsersDao.users = [];
    });
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
        },
        {
          userName: 'test2',
          balance: [
            {
              currency: 'EUR',
              amount: 50,
            },
          ],
        },
        {
          userName: 'test3',
          balance: [
            {
              currency: 'unknown',
              amount: 0,
            },
          ],
        },
      ];
    });

    it('gets balance by username and currency', () => {
      expect(UsersDao.getBalance('test', 'USD')).toEqual(10);
      expect(UsersDao.getBalance('test2', 'EUR')).toEqual(50);
      expect(UsersDao.getBalance('test3')).toEqual(0);
      expect(UsersDao.getBalance('test', 'EEK')).toEqual(0);
      expect(UsersDao.getBalance('test3', '')).toEqual(0);
    });

    afterAll(() => {
      UsersDao.users = [];
    });
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
            {
              currency: 'EUR',
              amount: 0,
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
            {
              currency: 'EUR',
              amount: 10,
            },
          ],
        },
      ];
    });

    it('deposits amount of currency', () => {
      expect(UsersDao.users).toEqual([
        {
          userName: 'test',
          balance: [
            { currency: 'USD', amount: 10 },
            { currency: 'EUR', amount: 0 },
          ],
        },
        {
          userName: 'test2',
          balance: [
            { currency: 'USD', amount: 10 },
            { currency: 'EUR', amount: 10 },
          ],
        },
      ]);
      UsersDao.deposit('test', 5, 'EUR');
      expect(UsersDao.getBalance('test', 'EUR')).toBe(5);
      expect(UsersDao.users).toEqual([
        {
          userName: 'test',
          balance: [
            { currency: 'USD', amount: 10 },
            { currency: 'EUR', amount: 5 },
          ],
        },
        {
          userName: 'test2',
          balance: [
            { currency: 'USD', amount: 10 },
            { currency: 'EUR', amount: 10 },
          ],
        },
      ]);
      UsersDao.deposit('test', 15, 'EUR');
      expect(UsersDao.getBalance('test', 'EUR')).toBe(20);
      expect(UsersDao.users).toEqual([
        {
          userName: 'test',
          balance: [
            { currency: 'USD', amount: 10 },
            { currency: 'EUR', amount: 20 },
          ],
        },
        {
          userName: 'test2',
          balance: [
            { currency: 'USD', amount: 10 },
            { currency: 'EUR', amount: 10 },
          ],
        },
      ]);
    });

    it('withdraws amount of currency', () => {
      expect(UsersDao.users).toEqual([
        {
          userName: 'test',
          balance: [
            { currency: 'USD', amount: 10 },
            { currency: 'EUR', amount: 0 },
          ],
        },
        {
          userName: 'test2',
          balance: [
            { currency: 'USD', amount: 10 },
            { currency: 'EUR', amount: 10 },
          ],
        },
      ]);
      UsersDao.withdrawMoney('test', 1, 'USD');
      expect(UsersDao.getBalance('test', 'USD')).toBe(9);
      expect(UsersDao.users).toEqual([
        {
          userName: 'test',
          balance: [
            { currency: 'USD', amount: 9 },
            { currency: 'EUR', amount: 0 },
          ],
        },
        {
          userName: 'test2',
          balance: [
            { currency: 'USD', amount: 10 },
            { currency: 'EUR', amount: 10 },
          ],
        },
      ]);
      UsersDao.withdrawMoney('test', 9, 'USD');
      expect(UsersDao.getBalance('test', 'EUR')).toBe(0);
      expect(UsersDao.users).toEqual([
        {
          userName: 'test',
          balance: [
            { currency: 'USD', amount: 0 },
            { currency: 'EUR', amount: 0 },
          ],
        },
        {
          userName: 'test2',
          balance: [
            { currency: 'USD', amount: 10 },
            { currency: 'EUR', amount: 10 },
          ],
        },
      ]);
    });

    it('sends money from user to user of currency', () => {
      expect(UsersDao.users).toEqual([
        {
          userName: 'test',
          balance: [
            { currency: 'USD', amount: 10 },
            { currency: 'EUR', amount: 0 },
          ],
        },
        {
          userName: 'test2',
          balance: [
            { currency: 'USD', amount: 10 },
            { currency: 'EUR', amount: 10 },
          ],
        },
      ]);
      UsersDao.sendMoney('test', 'test2', 1, 'USD');
      expect(UsersDao.users).toEqual([
        {
          userName: 'test',
          balance: [
            { currency: 'USD', amount: 9 },
            { currency: 'EUR', amount: 0 },
          ],
        },
        {
          userName: 'test2',
          balance: [
            { currency: 'USD', amount: 11 },
            { currency: 'EUR', amount: 10 },
          ],
        },
      ]);
      UsersDao.sendMoney('test', 'test2', 1, 'USD');
      expect(UsersDao.users).toEqual([
        {
          userName: 'test',
          balance: [
            { currency: 'USD', amount: 8 },
            { currency: 'EUR', amount: 0 },
          ],
        },
        {
          userName: 'test2',
          balance: [
            { currency: 'USD', amount: 12 },
            { currency: 'EUR', amount: 10 },
          ],
        },
      ]);
      UsersDao.sendMoney('test2', 'test', 10, 'EUR');
      expect(UsersDao.users).toEqual([
        {
          userName: 'test',
          balance: [
            { currency: 'USD', amount: 8 },
            { currency: 'EUR', amount: 10 },
          ],
        },
        {
          userName: 'test2',
          balance: [
            { currency: 'USD', amount: 12 },
            { currency: 'EUR', amount: 0 },
          ],
        },
      ]);
    });

    afterAll(() => {
      UsersDao.users = [];
    });
  });
});
