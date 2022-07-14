export const getResourceData = async ({ reader, resourceName }) => {
  const data = await reader(`./src/data/${resourceName}s.json`, {
    encoding: 'utf-8',
  });

  return JSON.parse(data);
};
