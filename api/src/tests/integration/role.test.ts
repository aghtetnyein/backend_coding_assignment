import supertest from "supertest";

process.env.NODE_ENV = "test";
import app from "../../index";
import sequelizeConnection from "../../config";

describe("Role Endpoints", () => {
  let db: any = sequelizeConnection;

  beforeAll(async () => {
    await db.sync({ force: true });
  });

  it("should create a new role", async () => {
    const res = await supertest(app).post("/api/v1/roles").send({
      name: "Admin",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body.body).toHaveProperty("name", "Admin");
  });

  it("should return all roles", async () => {
    const res = await supertest(app).get("/api/v1/roles");
    expect(res.statusCode).toEqual(200);
    expect((res.body.body as Array<any>).length).toBe(1);
    expect((res.body.body as Array<any>)[0]).toHaveProperty("name", "Admin");
  });

  afterAll(async () => {
    await db.close();
  });
});
