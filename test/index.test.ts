// import { ExBanking } from '../src';
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
  // describe('has one instance', () => {
  //   // @ts-ignore
  //   expect(() => new UsersDao()).toThrow();
  //   expect(UsersDao.users).toHaveLength(0);
  //   UsersDao.createUser('test name');
  //   UsersDao.createUser('test name2');
  //   expect(UsersDao.users).toHaveLength(2);
  //
  //   afterAll(() => {
  //     UsersDao.users = [];
  //   });
  // });
  //
  // describe('utils', () => {
  //   beforeEach(() => {
  //     UsersDao.users = [{
  //       userName: 'test',
  //       balance: [
  //         {
  //           currency: 'USD',
  //           amount: 10,
  //         },
  //       ],
  //     }];
  //   });
  //
  //   it('checks weather money amount on balance is enough', () => {
  //     expect(UsersDao.enoughMoney('test', 9.01, 'USD')).toBeTruthy();
  //     expect(UsersDao.enoughMoney('test', 10, 'USD')).toBeTruthy();
  //     expect(UsersDao.enoughMoney('test', 11, 'USD')).toBeFalsy();
  //     expect(UsersDao.enoughMoney('test', 11.02, 'USD')).toBeFalsy();
  //     expect(UsersDao.enoughMoney('test', 9.999, 'USD')).toBeTruthy();
  //   })
  //
  //   it('checks if a user already exists', () => {
  //     expect(UsersDao.userExists('test')).toBeTruthy();
  //     expect(UsersDao.userExists('Test')).toBeFalsy();
  //     expect(UsersDao.userExists('test ')).toBeFalsy();
  //     expect(UsersDao.userExists(' test ')).toBeFalsy();
  //     expect(UsersDao.userExists(' test')).toBeFalsy();
  //   })
  //
  //   afterAll(() => {
  //     UsersDao.users = [];
  //   });
  // })
  //
  // describe('creates user', () => {
  //   beforeEach(() => {
  //     UsersDao.users = [];
  //   });
  //
  //   it('creates user', () => {
  //     UsersDao.createUser('test name');
  //
  //     expect(UsersDao.users).toHaveLength(1);
  //   });
  //
  //   it('sets default balance and currency', () => {
  //     UsersDao.createUser('test name2');
  //
  //     expect(UsersDao.users).toEqual([
  //       {
  //         balance: [{ amount: 0, currency: 'unknown' }],
  //         userName: 'test name2',
  //       },
  //     ]);
  //   });
  //
  //   afterAll(() => {
  //     UsersDao.users = [];
  //   });
  // });

  describe('user balance', () => {
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
        }
      ];
    });

    it('gets balance by username and currency', () => {
      expect(UsersDao.getBalance('test', 'USD')).toEqual(10);
      expect(UsersDao.getBalance('test2', 'EUR')).toEqual(50);
      expect(UsersDao.getBalance('test3')).toEqual(0);
      expect(UsersDao.getBalance('test', 'EEK')).toEqual(0);
      expect(UsersDao.getBalance('test3', '')).toEqual(0);
    })

    afterAll(() => {
      UsersDao.users = [];
    });
  })
});
