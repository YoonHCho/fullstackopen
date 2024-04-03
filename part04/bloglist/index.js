// The index.js file only import the actual application from the app.js file and then starts the application
import app from "./app.js";
import logger from "./utils/logger.js";
import config from "./utils/config.js";

app.listen(config.PORT, () => logger.info(`Server running on port: ${config.PORT}`));
