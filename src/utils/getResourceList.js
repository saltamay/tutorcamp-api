export const getResourceList = async ({ reader, dirPath }) => {
  const resourceList = await reader(dirPath);

  return (
    resourceList &&
    resourceList.length &&
    resourceList
      .filter((file) => file.includes('model'))
      .map((file) => file.split('.')[0])
  );
};
