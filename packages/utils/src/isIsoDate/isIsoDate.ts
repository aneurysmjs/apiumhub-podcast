/**
 * @see https://stackoverflow.com/questions/52869695/check-if-a-date-string-is-in-iso-and-utc-format
 * @param {string} dateStr
 * @returns
 */
const isIsoDate = (dateStr: string) => {
  if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(dateStr)) {
    return false;
  }

  const date = new Date(dateStr);
  return date instanceof Date && !Number.isNaN(date) && date.toISOString() === dateStr;
};

export default isIsoDate;
