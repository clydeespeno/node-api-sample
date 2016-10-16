import nconf from "nconf";

export const env = ((process.env.NODE_ENV) || "development").toLowerCase();
export const port = process.env.NODE_PORT || "8888";

const conf = nconf
    .argv()
    .env()
    .file("common", "configuration/common.json")
    .file(env, `configuration/${env}.json`);

export default conf;
