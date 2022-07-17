export const convertDaysToMiliseconds = (days) => {
  const NUMBER_OF_HOURS = 24;
  const NUMBER_OF_MINUTES = 60;
  const NUMBER_OF_SECONDS = 60;
  const NUMBER_OF_MILISECONDS = 1000;

  return (
    days *
    NUMBER_OF_HOURS *
    NUMBER_OF_MINUTES *
    NUMBER_OF_MINUTES *
    NUMBER_OF_MILISECONDS
  );
};
