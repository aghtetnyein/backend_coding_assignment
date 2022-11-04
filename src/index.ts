import express, { Application, Request, Response } from "express";
import routes from "./routes";
import dotenv from "dotenv";
import cors from "cors";
import { cyan, cyanBright } from "cli-color";
import sequelizeConnection from "./db/config";

dotenv.config();

// variable constants
const PORT = process.env.PORT || 8000;
const corsOptions = {
  origin: `http://localhost:${PORT}`,
};

export const get = () => {
  const app: Application = express();
  app.use(cors(corsOptions));

  // Body parsing Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get("/", async (req: Request, res: Response): Promise<Response> => {
    return res.status(200).send({
      message: `Welcome to the Backend Assignment API! Endpoints available at http://localhost:${PORT}/api/v1`,
    });
  });

  app.use("/api/v1", routes);

  sequelizeConnection
    .sync()
    .then(() => {
      console.log(cyan("Database successfully connected"));
    })
    .catch((err) => {
      console.log("Error", err);
    });

  return app;
};

export const start = () => {
  const app = get();
  try {
    // listen for requests
    app.listen(PORT, () => {
      console.log(
        cyanBright(
          `⚡️[server]: Server is running at https://localhost:${PORT}`
        )
      );
    });
  } catch (error: any) {
    console.log(`Error occurred: ${error.message}`);
  }
};

start();
