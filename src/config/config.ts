import dotenv from "dotenv";
dotenv.config();

type Config = {
  readonly MONGO_URI: string;
  readonly PORT: number;
  readonly JWT_SECRET: string;
};

if (!process.env.MONGO_URI || !process.env.PORT || !process.env.JWT_SECRET) {
  throw new Error("Missing required environment variables");
}

export const config: Config = {
  MONGO_URI: process.env.MONGO_URI as string,
  PORT: Number(process.env.PORT),
  JWT_SECRET: process.env.JWT_SECRET as string,
};

// this file is used to load environment variables and export them as a config object that can be used throughout the application. It also validates that all required environment variables are present before exporting the config.
// as if one of the required environment variables is missing, it will throw an error and prevent the application from starting with incomplete configuration.
// also we use config as env vaibles may vary also we have aws secret keys and other sensitive information that we dont want to hardcode in our codebase. so we use environment variables to keep them secure and easily configurable across different environments (development, staging, production).
