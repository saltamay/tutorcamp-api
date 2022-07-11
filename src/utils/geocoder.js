import * as dotenv from 'dotenv';
dotenv.config();
import NodeGeocoder from 'node-geocoder';

const options = {
  provider: process.env.GEOCODER_PROVIDER,
  apiKey: process.env.GEOCODER_API_KEY,
  formatter: null,
};

export const geocoder = NodeGeocoder(options);
