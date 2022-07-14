import mongoose from 'mongoose';
import { readdir } from 'node:fs/promises';
import { Bootcamp } from '../models/bootcamp.model.js';
import { Course } from '../models/course.model.js';
import { eraseData } from './eraseData.js';
import { seedData } from './seedData.js';
import { validateUserInput } from '../utils/validateUserInput.js';
import { getResourceNames } from '../utils/getResourceNames.js';
import { getFileNames } from '../utils/getFileNames.js';
import { connectDatabase } from '../database/index.js';

import bootcamps from './bootcamps.json';
import courses from './courses.json';

const RESOURCES = {
  bootcamp: {
    data: bootcamps,
    resource: Bootcamp,
  },
  course: {
    data: courses,
    resource: Course,
  },
};

const loadRersources = async () => {
  const resourceList = await getFileNames({
    reader: readdir,
    dirPath: './src/models',
  });

  const resources = await getResourceNames({ resourceList });

  return resources;
};

const getResource = () => {
  const resourceName = process.argv[3];

  return RESOURCES[resourceName]['resource'];
};

const getResourceData = () => {
  const resourceName = process.argv[3];

  return RESOURCES[resourceName]['data'];
};

const action = ({ resource, data }) => {
  const userInput = process.argv[2];
  switch (userInput) {
    case '-s':
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
    await validateUserInput({ resources: loadRersources() });
    await connectDatabase();
    await action({ resource: getResource(), data: getResourceData() });
  } catch (err) {
    console.log(`[err]:${err.message}`.red);
  } finally {
    mongoose.connection.close();
  }
};

run();
