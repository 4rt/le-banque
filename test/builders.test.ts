import { OkResponseBuilder } from '../src/builders/OkResponseBuilder';

describe('OkResponseBuilder', () => {
  it('builds basic ok response', () => {
    expect(new OkResponseBuilder().build()).toEqual({ success: true });
  });

  it('builds ok response with balance', () => {
    expect(new OkResponseBuilder().withBalance(10).build()).toEqual({
      success: true,
      balance: 10,
    });
  });

  it('builds ok response with new balance', () => {
    expect(new OkResponseBuilder().withNewBalance(10).build()).toEqual({
      success: true,
      newBalance: 10,
    });
  });

  it('builds ok response with from and to balances', () => {
    expect(
      new OkResponseBuilder()
        .withFromUsernameBalance(10)
        .withToUsernameBalance(10)
        .build()
    ).toEqual({
      success: true,
      fromUsernameBalance: 10,
      toUsernameBalance: 10,
    });
  });
});
