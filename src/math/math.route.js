import express from "express";
import {sum} from "./math.service";

const math = express.Router();

math.get("/sum?", (req, res) => {
  res.end(sum(req.query.a, req.query.b))
});

export default math;
