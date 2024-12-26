/**
 * Returns a human-readable string describing how long ago the specified date occurred.
 *
 * @param dateString - A string representing a date that can be parsed by the JavaScript Date constructor
 * @returns A string indicating how many seconds, minutes, hours, or days have passed since the given date
 */
export const formatTimeAgo = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diff < 60) {
    return `${diff} seconds ago`;
  } else if (diff < 3600) {
    const minutes = Math.floor(diff / 60);
    return `${minutes} ${minutes === 1 ? 'min ago' : 'mins ago'}`;
  } else if (diff < 86400) {
    const hours = Math.floor(diff / 3600);
    return `${hours} ${hours === 1 ? 'hour ago' : 'hours ago'}`;
  } else {
    const days = Math.floor(diff / 86400);
    return `${days} ${days === 1 ? 'day ago' : 'days ago'}`;
  }
};
