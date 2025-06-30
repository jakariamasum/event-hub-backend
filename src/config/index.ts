import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });
export default {
  port: process.env.PORT,
  database_url: process.env.database_url,
  NODE_ENV: process.env.NODE_ENV,
  bcrypt_salt_rounds: process.env.bcrypt_salt_rounds,
};
