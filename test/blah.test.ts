// import { ExBanking } from '../src';
// import { WrongArguments } from '../src/errors';
import UsersDao from '../src/daos/UsersDao';
// import { ExBanking } from "../src";

describe('ExBanking', () => {
  // it('test', () => {
  //   const test = new ExBanking();
  //
  //   expect(test).toEqual({});
  //   expect(test.createUser('userName')).toEqual({ success: true });
  //   expect(test.deposit('name', 10, 'USD')).toEqual({ success: true, newBalance: 0 });
  //   expect(test.withdraw('name', 10, 'USD')).toEqual({ success: true, newBalance: 0 });
  //   expect(test.getBalance('name', 'USD')).toEqual({ success: true, balance: 0 });
  //   expect(test.send('fromName', 'toName', 10, 'USD')).toEqual({ success: true, fromUsernameBalance: 0, toUsernameBalance: 0 });
  // });
});

describe('UsersDao', () => {
  describe('has one instance', () => {
    // @ts-ignore
    expect(() => new UsersDao()).toThrow();
    expect(UsersDao.users).toHaveLength(0);
    UsersDao.createUser('test name');
    UsersDao.createUser('test name2');
    expect(UsersDao.users).toHaveLength(2);

    afterAll(() => {
      UsersDao.users = [];
    });
  });

  describe('creates user', () => {
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
  });
});
