import _ from "lodash";
import conf from "../config";
import fs from "fs";
import glob from "glob";
import hjson from "hjson";
import Promise from "bluebird";
const readFile = Promise.promisify(fs.readFile);
const globp = Promise.promisify(glob);

export const getMockedResponse = (url, method) =>
  urlRepo().then(repo => _.get(repo, `${method}[${url}]`));

function urlRepo() {
  return globp(`${conf.get("mock:mockResourcePath")}/**/*.json`, {})
    .then(files => Promise.all(files.map(file => getJson(file))).then(buildUrlRepo));
}

function buildUrlRepo(jsArray) {
  return jsArray.reduce((result, js) => {
    _.forEach(js, (v, k) => {
      result[k] = result[k] || {};
      _.extend(result[k], v);
    });

    return result;
  }, {});
}

function getJson(path) {
  return readFile(path, "utf-8").then((content) => hjson.parse(content));
}
