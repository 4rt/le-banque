type Balance = {
  currency: string | 'unknown',
  amount: number
}

class UsersDao {
  users: Array<{ userName: string, balance: Balance[] }> = [];

  userExists(userName: string): boolean {
    return this.users.filter(user => user.userName === userName).length > 0;
  }

  enoughMoney(userName: string, amount: number, currency: string): boolean {
    // find user by name
    // get user balance by currency
    // check if user balance is equal or greater than amount
    console.log(
      `userName: ${userName}, amount: ${amount}, currency: ${currency}`
    );

    return false;
  }

  createUser(userName: string): string {
    // Creates new user in the system
    // New user has zero balance of any currency

    this.users.push({
      userName,
      balance: [{
        currency: 'unknown',
        amount: 0
      }]
    });

    return userName;
  }

  getBalance(userName: string, currency = 'unknown'): number {
    const user = this.users.find(foundUser => foundUser.userName === userName)!;

    return user.balance.find(balance => balance.currency === currency)!.amount;
  }

  deposit(userName: string, amount: number, currency: string): number {
    // Increases user's balance in given currency by amount value
    console.log(
      `userName: ${userName}, amount: ${amount}, currency: ${currency}`
    );
    // find user by name
    // get user balance by currency
    // sum old and new balance and return new value
    // const currentBalance = this.users.filter(user => user.userName === userName).length > 0;

    return 0;
  }

  sendMoney(
    fromUsername: string,
    toUsername: string,
    amount: number,
    currency: string
  ): { fromUsernameBalance: number; toUsernameBalance: number } {
    console.log(
      `fromUsername: ${fromUsername}, toUsername: ${toUsername}, amount: ${amount}, currency: ${currency}`
    );

    return {
      fromUsernameBalance: 0,
      toUsernameBalance: 0,
    };
  }

  withdrawMoney(
    userName: string,
    amount: number,
    currency: string
  ): { newBalance: number } {
    // Decreases user's balance in given currency by amount value
    console.log(
      `userName: ${userName}, amount: ${amount}, currency: ${currency}`
    );

    return { newBalance: 0 };
  }
}

export default new UsersDao();
