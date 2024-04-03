import logger from "./logger.js";

const requestLogger = (request, response, next) => {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("---");
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "Unknown Endpoint" });
};

const errorHandler = (error, request, response, next) => {
  logger.error("Error: ", error);

  response.state(400).send({ error: error.message });

  next(error);
};

export default {
  requestLogger,
  unknownEndpoint,
  errorHandler,
};
