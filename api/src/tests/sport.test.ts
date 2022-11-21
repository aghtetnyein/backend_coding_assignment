import supertest from "supertest";

process.env.NODE_ENV = "test";
import app from "../index";
import sequelizeConnection from "../config";

describe("Sport Endpoints", () => {
  let db = sequelizeConnection;

  beforeAll(async () => {
    await db.sync({ force: true });
  });

  it("retrieves sports multiple (= more than or equal to 2) players are associated with.", async () => {
    await supertest(app)
      .post("/api/v1/players")
      .send({
        email: "alex@gmail.com",
        gender: "male",
        age: 22,
        level: 5,
        sports: [
          {
            name: "Boxing",
          },
        ],
      });

    await supertest(app).get("/api/v1/sports").expect(200);
    await supertest(app).get("/api/v1/sports?multiPlayers=0").expect(200);
    await supertest(app).get("/api/v1/sports?multiPlayers=1").expect(404);

    await supertest(app)
      .post("/api/v1/players")
      .send({
        email: "messi@gmail.com",
        gender: "male",
        age: 36,
        level: 5,
        sports: [
          {
            name: "Boxing",
          },
        ],
      });

    await supertest(app).get("/api/v1/sports?multiPlayers=1").expect(200);
  });

  afterAll(async () => {
    await db.close();
  });
});
