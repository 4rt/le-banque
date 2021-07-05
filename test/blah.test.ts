// import { ExBanking } from '../src';
// import { WrongArguments } from '../src/errors';
import UsersDao from '../src/daos/UsersDao';

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
  //
  // it('WrongArguments', () => {
  //   const wrongArgumentsError = new WrongArguments();
  //   expect(wrongArgumentsError.success).toBe(false);
  //   expect(wrongArgumentsError.message).toBe('Wrong arguments');
  // })

  it('UsersDao', async () => {
    // const test = await UsersDao.createUser('userName');
    // expect(test).toEqual({balance: {}});

    await UsersDao.createUser('userName2');

    expect(await UsersDao.patchUserByUserName('userName2', 10, 'EEK')).toEqual({
      balance: { EEK: 10 },
    });
  });
});
