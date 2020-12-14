import {
  formatRelative,
  isSameDay,
  isToday,
  isYesterday,
  format,
} from 'date-fns';

export const formatDate = (date) => {
  return format(new Date(date), "MMM d', ' YYY");
};

export const formatTime = (date) => {
  return format(new Date(date), "h':'mm a");
};

export const formatRelativeTime = (date) => {
  return formatRelative(new Date(date), new Date());
};

export const formatToYesterDay = (date) => {
  return isToday(new Date(date))
    ? 'Today'
    : isYesterday(new Date(date))
    ? 'Yesterday'
    : formatDate(date);
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
