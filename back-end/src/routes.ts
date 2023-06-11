import express from "express";
import { addInfo,getInfo } from "./controllers/Info";

const apiRouter = express.Router();

apiRouter.get("/", (req, res) => {
  res.send("MERN server is ready to move on");
});

/*Auth Routes*/
apiRouter.post("/info", addInfo);
//apiRouter.put("/info/update", updateInfo);
apiRouter.get("/info", getInfo);


export default apiRouter;
