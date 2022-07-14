import capitalize from 'lodash.capitalize';

export const getResource = async ({ loader, resourceName }) => {
  const resources = await Promise.resolve(loader());
  return resources[capitalize(resourceName)];
};
