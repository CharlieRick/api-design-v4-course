import app from "../server";
import supertest from "supertest";

describe("Test routes", () => {
  it("should return 200", async () => {
    const res = await supertest(app).get("/");
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("hello friend");
  });
});
