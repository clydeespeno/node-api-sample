import express from "express";

const middleware = express();

middleware.disable("x-powered-by");

middleware.get("/", (req, res) => {
  res.send({hello: "World!"})
});

export default middleware;
