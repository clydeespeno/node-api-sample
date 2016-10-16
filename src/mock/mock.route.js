import express from "express";
import {getMockedResponse} from "./mock.service";
import logger from "../logger";
import _ from "lodash";

const mock = express.Router();

mock.all("/*", (req, res, next) => {
  getMockedResult(req).then(mockedResult => {
    if (_.isUndefined(mockedResult)) {
      next();
    } else {
      _.forOwn(mockedResult.headers, (v, k) => res.setHeader(k, v));
      res.setHeader("X-Mocked", true);
      res.status(mockedResult.status).send(mockedResult.response);
    }
  }).catch(err => {
    logger.error(err);
    next();
  });
});

function getMockedResult(req) {
  if (_.eq(_.lowerCase(req.header("X-Mock")), "true")) {
    return getMockedResponse(req.url, _.toLower(req.method));
  }
  return Promise.resolve(undefined);
}

export default mock;
