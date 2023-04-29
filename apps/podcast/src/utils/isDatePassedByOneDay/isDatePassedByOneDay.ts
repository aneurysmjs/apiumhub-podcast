import { isIsoDate } from '@apiumhub/utils';

const dayInMilliseconds = 86400000;

const isDatePassedByOneDay = (currentDateStr: string, dateToCheckStr: string) => {
  if (!isIsoDate(currentDateStr)) {
    throw new Error(`current date is not valid ISO string date`);
  }

  if (!isIsoDate(dateToCheckStr)) {
    throw new Error(`date to check is not valid ISO string date`);
  }
  // get current date
  const currentDate = new Date(currentDateStr);

  // set the date you want to check
  const dateToCheck = new Date(dateToCheckStr);

  // calculate the difference between the two dates in milliseconds
  const differenceInMilliseconds = dateToCheck.getTime() - currentDate.getTime();

  // check if the difference is greater than or equal to the number of milliseconds in a day
  return differenceInMilliseconds >= dayInMilliseconds;
};

export default isDatePassedByOneDay;
