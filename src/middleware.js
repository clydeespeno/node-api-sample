import express from "express";
import cors from "cors";
import {logErrors} from "./errorhandler";
import config from "./config";
import mockRoute from "./mock/mock.route";
import mathRoute from "./math/math.route";

const middleware = express();

middleware.disable("x-powered-by");

middleware.use(cors());

if (config.get("mock:isEnabled")) {
  middleware.use("/", mockRoute);
}

middleware.use("/math", mathRoute);

middleware.get("/", (req, res) => {
  res.send({hello: "World!"})
});

middleware.use(logErrors);


export default middleware;
