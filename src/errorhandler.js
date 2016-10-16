import logger from "./logger";

export const logErrors = (err, req, res, next) => {
  logger.error(err.msg, {
    stacktrace: err.stack,
    url: req.url
  });
  next(err);
};
