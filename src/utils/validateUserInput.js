export const validateUserInput = async ({ resourcesList, resourceName }) => {
  const resourceList = await Promise.resolve(resourcesList);

  if (!resourceName || !resourceList.includes(resourceName)) {
    throw new Error(
      ` Please enter a valid resource name.
        npm run db:[seed|erase] [${
          resourceList && resourceList.length && resourceList.join('|')
        }]`
    );
  }
};
