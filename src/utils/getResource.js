// TODO: Import resource dynamically
export const getResource = async (resourceName) => {
  const { resource: Bootcamp } = await import(
    `../models/${resourceName}.model.js`
  );
  console.log(await Bootcamp);
  return resource;
};
