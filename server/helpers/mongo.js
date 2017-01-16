import mongoose from 'mongoose';

import config from '../../configs';

const HOST = config.dbHost || 'localhost';
const PORT = config.dbPort || '27017';
const DB_NAME = config.dbName || 'test';

export default () => {
  try {
    mongoose.connect(`mongodb://${HOST}:${PORT}/${DB_NAME}`);
    console.log('Connected to mongoDB');
  } catch (err) {
    console.error(`Couldn't connect to ${DB_NAME} on host ${HOST}:${PORT}`);
  }
};
