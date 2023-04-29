import { format } from 'date-fns';

const formatMilliseconds = (milliseconds: number) => {
  const duration = {
    hours: 0,
    minutes: 0,
    seconds: 0,
  };
  // Convert to whole seconds
  const seconds = Math.floor(milliseconds / 1000);

  if (seconds > 0) {
    // Calculate the hours, minutes and remaining seconds
    duration.hours = Math.floor(seconds / 3600);
    duration.minutes = Math.floor((seconds % 3600) / 60);
    duration.seconds = seconds % 60;
  }

  // Format the duration using the formatDuration function
  // Format the duration as hh:mm:ss
  const formatted = format(
    new Date(0, 0, 0, duration.hours, duration.minutes, duration.seconds),
    'HH:mm:ss',
  );

  return formatted;
};

export default formatMilliseconds;
