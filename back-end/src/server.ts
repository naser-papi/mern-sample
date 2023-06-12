import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import path from "path";
import apiRouter from "./routes";
import { IError } from "./models/GlobalTypes";

/* Configuration */
const server = express();

server.use(express.json());
server.use(helmet());
server.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
server.use(bodyParser.json({ limit: "30mb" }));
server.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
server.use(cors());
server.use("/assets", express.static(path.join(__dirname, "public/assets")));

server.get("/", (req, res) => {
  res.send("MERN server is ready to move on");
});
server.use("/api", apiRouter);

server.use(
  (err: IError, req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (err) {
      res.status(400).json({ error: err.message });
    }
    next();
  }
);

/* MongoDB Connection */
mongoose
  .connect(process.env.DATABASE_URI, { dbName: process.env.DATABASE_NAME })
  .then(() => {
    server.listen(Number(process.env.PORT), process.env.SERVER, () => {
      console.log(
        `Server is running on this address: http://${process.env.SERVER}:${process.env.PORT}`
      );
    });
  })
  .catch((err) => console.log(`DB connection error: ${err}`));
