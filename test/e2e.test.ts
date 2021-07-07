import { ExBanking } from '../src';

describe('App happy flow', () => {
  const app = new ExBanking();
  it('Creates user, deposits money and gets balance', () => {
    const user = app.createUser('name');
    expect(user).toEqual({ success: true });
    const newBalance = app.deposit('name', 10, 'USD');
    expect(newBalance).toEqual({ success: true, newBalance: 10 });
    const balance = app.getBalance('name', 'USD');
    expect(balance).toEqual({ success: true, balance: 10 });
  });

  it('Creates user, deposits money and gets balance then withdraws', () => {
    const user2 = app.createUser('name2');
    expect(user2).toEqual({ success: true });
    const newBalance = app.deposit('name2', 10, 'EUR');
    expect(newBalance).toEqual({ success: true, newBalance: 10 });
    const balance = app.getBalance('name2', 'EUR');
    expect(balance).toEqual({ success: true, balance: 10 });
    const balanceAfterWithdraw = app.withdraw('name2', 1, 'EUR');
    expect(balanceAfterWithdraw).toEqual({ success: true, newBalance: 9 });
    const balance2 = app.getBalance('name2', 'EUR');
    expect(balance2).toEqual({ success: true, balance: 9 });
  });

  it('Creates users and transfers money between them', () => {
    const user3 = app.createUser('name3');
    const user4 = app.createUser('name4');
    expect(user3).toEqual({ success: true });
    expect(user4).toEqual({ success: true });
    const newBalance3 = app.deposit('name3', 100, 'EEK');
    expect(newBalance3).toEqual({ success: true, newBalance: 100 });
    const balance3 = app.getBalance('name3', 'EEK');
    expect(balance3).toEqual({ success: true, balance: 100 });
    const transaction = app.send('name3', 'name4', 50, 'EEK');
    expect(transaction).toEqual({
      success: true,
      fromUsernameBalance: 50,
      toUsernameBalance: 50,
    });
    const newBalance3new = app.getBalance('name3', 'EEK');
    expect(newBalance3new).toEqual({ success: true, balance: 50 });
    const newBalance4new = app.getBalance('name4', 'EEK');
    expect(newBalance4new).toEqual({ success: true, balance: 50 });
  });
});
