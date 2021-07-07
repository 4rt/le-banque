# nodejs-test

Test task for Node jS developers. Simple NPM package banking application in Typescript language.

### API reference

Requirements for public functions provided by `ExBanking` package. Any function should return success result or error result. Success result is different for each function, error result is generic

```
type BankingError = Error | 
  WrongArguments | 
  UserAlreadyExists | 
  UserDoesNotExist |
  NotEnoughMoney | 
  SenderDoesNotExist | 
  ReceiverDoesNotExist;
```

```
type Ok = { success: true };
```

`const createUser = (username: string): Ok | BankingError => {};`

- Function creates new user in the system
- New user has zero balance of any currency

`const deposit = (username: string, amount: number, currency: string): (Ok & { newBalance: number } | BankingError) => {};`

- Increases user's balance in given `currency` by `amount` value
- Returns `newBalance` of the user in given format

`const withdraw = (username: string, amount: number, currency: string): (Ok & { newBalance: number } | BankingError) => {};`

- Decreases user's balance in given `currency` by `amount` value
- Returns `new_balance` of the user in given format

`const getBalance = (username: string, currency: string): (Ok & { balance: number } | BankingError) => {};`

- Returns `balance` of the user in given format

`const send = (fromUsername: string, toUsername: string, amount: number, currency: string): (Ok & { fromUsernameBalance: number, toUsernameBalance: number } | BankingError) => {};`

- Decreases `fromUsername`'s balance in given `currency` by `amount` value
- Increases `toUsername`'s balance in given `currency` by `amount` value
- Returns `balance` of `fromUser` and `toUser` in given format