class UsersDao {
    users: Array<{ id: string, userName: string }> = [];

    constructor() {
        console.log('UsersDao singleton')
    }

    userExists(userName: string): boolean {
        return this.users.filter(user => user.userName === userName).length > 0
    }

    enoughMoney(userName: string, amount: number, currency: string): boolean {
        // find user by name
        // get user balance by currency
        // check if user balance is equal or greater than amount
        console.log(`userName: ${userName}, amount: ${amount}, currency: ${currency}`);

        return false
    }

    createUser(userName: string): string {
        const id = (new Date()).getTime().toString(36);
        this.users.push({
            id,
            userName
        });

        return id
    }

    getBalance(userName: string, currency: string): number {
        console.log(`userName: ${userName}, currency: ${currency}`);

        return 0
    }

    deposit(userName: string, amount: number, currency: string): number {
        console.log(`userName: ${userName}, amount: ${amount}, currency: ${currency}`);
        // find user by name
        // get user balance by currency
        // sum old and new balance and return new value
        // const currentBalance = this.users.filter(user => user.userName === userName).length > 0;

        return 0
    }

    sendMoney(fromUsername: string, toUsername: string, amount: number, currency: string): { fromUsernameBalance: number; toUsernameBalance: number } {
        console.log(`fromUsername: ${fromUsername}, toUsername: ${toUsername}, amount: ${amount}, currency: ${currency}`);

        return {
            fromUsernameBalance: 0,
            toUsernameBalance: 0
        }
    }

    withdrawMoney(userName: string, amount: number, currency: string): { newBalance: number } {
        console.log(`userName: ${userName}, amount: ${amount}, currency: ${currency}`);

        return { newBalance: 0 }
    }
}

export default new UsersDao();