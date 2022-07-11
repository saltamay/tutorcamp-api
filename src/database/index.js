import * as dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';

const user = process.env.DB_USERNAME;
const password = process.env.DB_USER_PASSWORD;
const cluster = process.env.DB_CLUSTER;

const url = `mongodb+srv://${user}:${password}@${cluster}.mongodb.net/?retryWrites=true&w=majority`;
console.log(url);
export const connectDatabase = async () => {
  const db = await mongoose.connect(url);

  console.log(`[database]: ${db.connection.host}`.cyan.bold);
};
