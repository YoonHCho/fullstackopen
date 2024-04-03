import "dotenv/config";

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGODB_URI;

export default {
  PORT,
  MONGO_URI,
};
