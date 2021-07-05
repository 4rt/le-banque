import UsersDao from '../daos/UsersDao';
import {
    NotEnoughMoney,
    ReceiverDoesNotExist,
    SenderDoesNotExist,
    UserAlreadyExists,
    UserDoesNotExist,
    WrongArguments
} from '../errors';

class BankingService {
    constructor() {
        console.log('BankingService singleton')
    }

    createUser(userName: string): string | WrongArguments | UserAlreadyExists {
        if (!userName) throw new WrongArguments();

        if (UsersDao.userExists(userName)) throw new UserAlreadyExists();

        return UsersDao.createUser(userName);
    }

    deposit(userName: string, amount: number, currency: string): number | WrongArguments | UserDoesNotExist {
        if (!userName || !amount || !currency) throw new WrongArguments();
        
        if (!UsersDao.userExists(userName)) throw new UserDoesNotExist();
        
        return UsersDao.deposit(userName, amount, currency);
    }

    getBalance(userName: string, currency: string): number | WrongArguments | UserDoesNotExist {
        if (!userName || !currency) throw new WrongArguments();

        if (!UsersDao.userExists(userName)) throw new UserDoesNotExist();
        
        return UsersDao.getBalance(userName, currency);
    }

    send(fromUsername: string, toUsername: string, amount: number, currency: string): { fromUsernameBalance: number; toUsernameBalance: number } | WrongArguments | NotEnoughMoney | SenderDoesNotExist | ReceiverDoesNotExist {
        if (!fromUsername || !toUsername || !amount || !currency) throw new WrongArguments();

        if (!UsersDao.enoughMoney(fromUsername, amount, currency)) throw new NotEnoughMoney();

        if (!UsersDao.userExists(fromUsername)) throw new SenderDoesNotExist();

        if (!UsersDao.userExists(toUsername)) throw new ReceiverDoesNotExist();

        return UsersDao.sendMoney(fromUsername, toUsername, amount, currency);
    }

    withdraw(userName: string, amount: number, currency: string): { newBalance: number } | WrongArguments | UserDoesNotExist | NotEnoughMoney {
        if (!userName || !currency) throw new WrongArguments();

        if (!UsersDao.userExists(userName)) throw new UserDoesNotExist();

        if (!UsersDao.enoughMoney(userName, amount, currency)) throw new NotEnoughMoney();

        return UsersDao.withdrawMoney(userName, amount, currency);
    }
}

export default new BankingService();