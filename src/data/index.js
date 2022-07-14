import mongoose from 'mongoose';
import { readdir, readFile } from 'node:fs/promises';
import * as resources from '../models/index.js';
import { eraseData } from './eraseData.js';
import { seedData } from './seedData.js';
import { connectDatabase } from '../database/index.js';
import {
  getResource,
  getResourceData,
  getResourceList,
  loadRersources,
  validateUserInput,
} from '../utils/index.js';

const action = async ({ resourceName, resource, getData }) => {
  const userInput = process.argv[2];
  switch (userInput) {
    case '-s':
      const data = await getData({ reader: readFile, resourceName });
      return seedData({ resource, data });
      break;
    case '-d':
      return eraseData({ resource });
      break;
    default:
      break;
  }
};

const run = async () => {
  try {
    const resourceName = process.argv[3];
    await validateUserInput({
      resourcesList: getResourceList({
        reader: readdir,
        dirPath: './src/models',
      }),
      resourceName,
    });

    const resource = await getResource({
      loader: loadRersources,
      resourceName,
    });

    await connectDatabase();
    await action({
      resourceName,
      resource,
      getData: getResourceData,
    });
  } catch (err) {
    console.log(`[err]: ${err.message}`.red);
  } finally {
    mongoose.connection.close();
  }
};

run();
