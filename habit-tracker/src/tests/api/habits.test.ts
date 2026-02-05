
import request from "supertest";
import { createTestServer } from "@/test-utils/test-server";



let server: any;

beforeAll(async () => {
  server = await createTestServer();
});

afterAll(() => {
  server.close();
});

describe("Habits API – Integration Tests", () => {
  it("GET /api/habits should return 401 if unauthorized", async () => {
    const res = await request(server).get("/api/habits");

    expect(res.status).toBe(401);
    expect(res.body.error).toBeDefined();
  });

  it("POST /api/habits should fail with invalid payload", async () => {
    const res = await request(server)
      .post("/api/habits")
      .send({});

    expect(res.status).toBe(400);
  });
});
