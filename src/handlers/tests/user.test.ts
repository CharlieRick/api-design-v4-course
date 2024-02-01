import * as User from "../user";

describe("user handler", () => {
  it("should create new user", async () => {
    const req = {
      body: {
        username: "testuser2",
        password: "password",
      },
    };

    const res = {
      json: jest.fn(),
    };

    await User.createUser(req, res);
  });
});
