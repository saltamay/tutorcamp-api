export const getFileNames = async ({ reader, dirPath }) => {
  try {
    const files = await reader(dirPath);
    return files;
  } catch (err) {
    console.log(err.message);
  }
};
