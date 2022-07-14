import colors from 'colors';

export const seedData = async ({ resource, data }) => {
  console.log('[seed]: running...'.yellow.inverse);
  await resource.deleteMany({});
  await resource.insertMany(data);
  console.log('[seed]: success'.green.inverse);
};
