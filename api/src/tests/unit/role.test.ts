import request from "supertest";
import app from "../../index";

describe("Role Endpoints", () => {
  it("should return all roles", async () => {
    const res = await request(app).get("/api/v1/roles");
    expect(res.statusCode).toEqual(200);
  });

  it("should create a new role", async () => {
    const res = await request(app).post("/api/v1/roles").send({
      name: "Admin",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body.body).toHaveProperty("name", "Admin");
  });
});
