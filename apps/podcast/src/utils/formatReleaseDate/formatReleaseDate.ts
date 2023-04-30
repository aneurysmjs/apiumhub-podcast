import { format, parseISO } from 'date-fns';

const formatReleaseDate = (isoString: string) => {
  return format(parseISO(isoString), 'dd/MM/yyyy');
};

export default formatReleaseDate;
