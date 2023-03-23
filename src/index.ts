import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { pool } from "./db";
import path from "path";
import { question1, question3 } from "./quries";
dotenv.config();

const app: Express = express();
const port = process.env.PORT;

(async () => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(express.static("src"));
  app.use(express.static("public"));
  app.use(express.static("dist"));
  app.set("views", path.join(__dirname, "views"));

  app.set("view engine", "ejs");

  async function addParties(body: any): Promise<string> {
    let message = "";
    try {
      await pool.query(question3(body));
      message = "Added successfully!";
    } catch (error) {
      message = "An error occured!";
      console.log(error);
    }

    return message;
  }

  app.all("/", async (req: Request, res: Response) => {
    const { filter } = req.body;
    const data = await pool.query(question1);
    let lgas = new Set(data[0].map((item: any) => item.lga));
    const filtered = filter
      ? data[0].filter((item: any) => item.lga === filter)
      : data[0];
    res.render("question1", { data: filtered, lgas, filter });
  });

  app.all("/create", async (req: Request, res: Response) => {
    const poll_units = await pool.query(
      `select polling_unit_name, uniqueid from polling_unit`
    );
    let message = "";

    const submission = Object.entries(req.body).length > 0;
    if (submission) {
      message = await addParties(req.body);
    }

    res.render("question3", { pu: poll_units[0], message });
  });

  app.listen(port, async () => {
    console.log(`⚡️[server]: Server is running at ${port}`);
  });
})();
