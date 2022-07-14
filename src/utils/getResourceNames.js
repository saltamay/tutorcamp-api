export const getResourceNames = ({ resourceList }) => {
  return (
    resourceList &&
    resourceList.length &&
    resourceList
      .filter((file) => file.includes('model'))
      .map((file) => file.split('.')[0])
  );
};
