import { isSameDay, isToday, isYesterday, format } from 'date-fns';

export const formatDateInWords = (date) => {
  return format(new Date(date), "MMM d', ' YYY");
};

export const formatDateInNum = (date) => {
  return format(new Date(date), 'dd/MM/yy');
};

export const formatTime = (date) => {
  return format(new Date(date), "h':'mm a");
};

export const formatToYesterDay = (date) => {
  return isToday(new Date(date))
    ? 'Today'
    : isYesterday(new Date(date))
    ? 'Yesterday'
    : formatDateInWords(date);
};

export const formatRecentDate = (date) => {
  const first = isToday(new Date(date))
    ? 'Today'
    : isYesterday(new Date(date))
    ? 'Yesterday'
    : formatDateInNum(date);

  return first.concat(` at ${formatTime(date)}`);
};

export const sameDay = (prevDate, currentDate) => {
  return isSameDay(new Date(prevDate), new Date(currentDate));
};

export const getErrorMsg = (err) => {
  if (err.graphQLErrors[0]?.message) {
    return err.graphQLErrors[0].message;
  } else {
    return err?.message;
  }
};

export const truncateString = (string, maxCharLimit) => {
  return string.length < maxCharLimit
    ? string
    : string.slice(0, maxCharLimit) + '...';
};
