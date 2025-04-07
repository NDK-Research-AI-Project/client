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

/**
 * Formats an ISO date string into a user-friendly date and time format.
 *
 * @param isoDateString - An ISO date string (e.g., '2025-04-07T09:35:53.813000')
 * @param options - Optional configuration for formatting
 * @returns A user-friendly formatted date string
 */
export const formatDate = (
  isoDateString: string,
  options: {
    includeTime?: boolean;
    includeSeconds?: boolean;
    use12HourFormat?: boolean;
  } = {
    includeTime: true,
    includeSeconds: false,
    use12HourFormat: true,
  }
): string => {
  try {
    const date = new Date(isoDateString);

    // Check if date is valid
    if (isNaN(date.getTime())) {
      return 'Invalid date';
    }

    const { includeTime, includeSeconds, use12HourFormat } = options;

    // Format date portion
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    const dateStr = `${month} ${day}, ${year}`;

    // Return date only if time is not needed
    if (!includeTime) {
      return dateStr;
    }

    // Format time portion
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    let timeStr;
    if (use12HourFormat) {
      const period = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12; // Convert to 12-hour format

      timeStr = includeSeconds
        ? `${hours}:${minutes}:${seconds} ${period}`
        : `${hours}:${minutes} ${period}`;
    } else {
      // 24-hour format
      const hoursStr = hours.toString().padStart(2, '0');
      timeStr = includeSeconds
        ? `${hoursStr}:${minutes}:${seconds}`
        : `${hoursStr}:${minutes}`;
    }

    return `${dateStr} at ${timeStr}`;
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid date';
  }
};
