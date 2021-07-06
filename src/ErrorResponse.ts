import { BankingError } from './errors/types';
import BaseResponse from './BaseResponse';

export default class ErrorResponse extends BaseResponse {
  message: string;
  name: string;

  constructor(error: BankingError) {
    super(false);
    this.message = error.message;
    this.name = error.name;
  }
}
