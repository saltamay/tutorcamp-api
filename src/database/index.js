import * as dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';

const user = process.env.DB_USERNAME;
const password = process.env.DB_USER_PASSWORD;
const cluster = process.env.DB_CLUSTER;

const dbName =
  process.env.NODE_ENV === 'test'
    ? process.env.TEST_DB_NAME
    : process.env.DB_NAME;

const url = `mongodb+srv://${user}:${password}@${cluster}.mongodb.net/${dbName}?retryWrites=true&w=majority`;

export const connectDatabase = async () => {
  const db = await mongoose.connect(url);

  console.log(`[database]: ${db.connection.host}`.cyan.bold);
};
