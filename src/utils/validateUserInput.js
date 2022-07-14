export const validateUserInput = async ({ resources }) => {
  const resourceList = await Promise.resolve(resources);

  if (!process.argv[3] || !resourceList.includes(process.argv[3])) {
    throw new Error(
      ` Please enter a valid resource name.
       npm run db:[seed|erase] [${
         resourceList && resourceList.length && resourceList.join('|')
       }]`
    );
  }
};
