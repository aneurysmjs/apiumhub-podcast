/* eslint-disable @typescript-eslint/no-empty-function */
import { useState, useEffect } from 'react';
import { isNil } from 'ramda';
import isDatePassedByOneDay from '@/utils/isDatePassedByOneDay';

export const EXPIRATION_KEY = 'podcastFetchExpirationDate';

const getExpirationDate = () => localStorage.getItem(EXPIRATION_KEY);

const useExpiration = (currentDate: string, cb: () => void) => {
  const [dateToCheck, setDateToCheck] = useState(getExpirationDate());

  useEffect(() => {
    if (isNil(dateToCheck)) {
      const todayDate = new Date().toISOString();
      localStorage.setItem(EXPIRATION_KEY, todayDate);
      setDateToCheck(todayDate);
    }
  }, [dateToCheck]);

  useEffect(() => {
    if (dateToCheck && isDatePassedByOneDay(dateToCheck, currentDate)) {
      cb();

      localStorage.setItem(EXPIRATION_KEY, currentDate);
      setDateToCheck(currentDate);
    }
  }, [cb, currentDate, dateToCheck]);

  return {
    savedDate: dateToCheck,
  };
};

export default useExpiration;
