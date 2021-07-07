import OkResponse from '../models/OkResponse';

export class OkResponseBuilder {
  response = {};

  withBalance(amount: number) {
    Object.assign(this.response, { balance: amount });
    return this;
  }

  withNewBalance(newBalance: number) {
    Object.assign(this.response, { newBalance });
    return this;
  }

  withFromUsernameBalance(fromUsernameBalance: number) {
    Object.assign(this.response, { fromUsernameBalance });
    return this;
  }

  withToUsernameBalance(toUsernameBalance: number) {
    Object.assign(this.response, { toUsernameBalance });
    return this;
  }

  build(): any {
    return Object.assign(this.response, new OkResponse());
  }
}
