import mongoose from 'mongoose';
import colors from 'colors';
import bootcamps from '../../data/bootcamps.json';
import { connectDatabase } from '../database/index.js';
import { Bootcamp } from '../models/bootcamp.model.js';

const seedData = async () => {
  try {
    await connectDatabase();
    console.log('[seed]: running...'.yellow.inverse);

    await Bootcamp.deleteMany({});
    await Bootcamp.create(bootcamps);

    console.log('[seed]: success'.green.inverse);
  } catch (err) {
    console.log(`[err]: ${err.message}`.red);
  } finally {
    mongoose.connection.close();
  }
};

const deleteData = async () => {
  try {
    await connectDatabase();
    console.log('[erase]: running...'.red.inverse);
    await Bootcamp.deleteMany({});
    console.log('[erase]: success'.green.inverse);
  } catch (err) {
    console.log(`[err]: ${err.message}`.red);
  } finally {
    mongoose.connection.close();
  }
};

if (process.argv[2] === 'delete') {
  deleteData();
} else {
  seedData();
}
