import { BankingError } from '../errors/types';

export type Ok = { success: true };

export interface IExBanking {
    createUser: (username: string) => Ok | BankingError;
    deposit: (username: string, amount: number, currency: string) => (Ok & { newBalance: number } | BankingError);
    withdraw: (username: string, amount: number, currency: string) => (Ok & { newBalance: number } | BankingError);
    getBalance: (username: string, currency: string) => (Ok & { balance: number } | BankingError);
    send: (fromUsername: string, toUsername: string, amount: number, currency: string) => (Ok & { fromUsernameBalance: number, toUsernameBalance: number } | BankingError);
}