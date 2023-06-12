import express from "express";
import { addInfo, getInfoList, updateInfo } from "./controllers/Info";

const withErrorHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

const apiRouter = express.Router();

apiRouter.get("/", (req, res) => {
  res.send("MERN server is ready to move on");
});

/*Auth Routes*/
apiRouter.post("/info", withErrorHandler(addInfo));
apiRouter.put("/info/:id", withErrorHandler(updateInfo));
apiRouter.get("/info/", withErrorHandler(getInfoList));

export default apiRouter;
