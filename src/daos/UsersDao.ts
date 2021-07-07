type Balance = {
  currency: string | 'unknown';
  amount: number;
};

// TODO: handle 2 decimal precision of money amount
class UsersDao {
  users: Array<{ userName: string; balance: Balance[] }> = [];

  userExists(userName: string): boolean {
    return this.users.filter(user => user.userName === userName).length > 0;
  }

  enoughMoney(userName: string, amount: number, currency: string): boolean {
    const currentAmount = this.getBalance(userName, currency);

    return currentAmount >= amount;
  }

  createUser(userName: string): string {
    this.users.push({
      userName,
      balance: [
        {
          currency: 'unknown',
          amount: 0,
        },
      ],
    });

    return userName;
  }

  getBalance(userName: string, currency = 'unknown'): number {
    const user = this.users.find(foundUser => foundUser.userName === userName)!;

    const balance = user.balance.find(
      currentBalance => currentBalance.currency === currency
    );

    if (balance) {
      return balance.amount;
    } else {
      return 0;
    }
  }

  deposit(userName: string, amount: number, currency: string): number {
    const userIndex = this.users.findIndex(user => user.userName === userName);
    const currencyIndex = this.users[userIndex].balance.findIndex(
      balance => balance.currency === currency
    );
    let newBalance: number;

    if (currencyIndex >= 0) {
      newBalance = this.users[userIndex].balance[
        currencyIndex
      ].amount += amount;
    } else {
      newBalance = amount;
      this.users[userIndex].balance.push({
        currency: currency,
        amount: amount,
      });
    }

    return newBalance;
  }

  withdrawMoney(userName: string, amount: number, currency: string): number {
    const userIndex = this.users.findIndex(user => user.userName === userName);

    let newBalance = 0;

    this.users[userIndex].balance.forEach(balance => {
      if (balance.currency === currency) {
        newBalance = balance.amount -= amount;
        balance.amount = newBalance;
      }
    });

    return newBalance;
  }

  sendMoney(
    fromUsername: string,
    toUsername: string,
    amount: number,
    currency: string
  ): { fromUsernameBalance: number; toUsernameBalance: number } {
    const fromUsernameBalance = this.withdrawMoney(
      fromUsername,
      amount,
      currency
    );

    const toUsernameBalance = this.deposit(toUsername, amount, currency);

    return {
      fromUsernameBalance,
      toUsernameBalance,
    };
  }
}

export default new UsersDao();
