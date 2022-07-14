import colors from 'colors';

export const eraseData = async ({ resource }) => {
  console.log('[erase]: running...'.red.inverse);
  await resource.deleteMany({});
  console.log('[erase]: success'.green.inverse);
};
