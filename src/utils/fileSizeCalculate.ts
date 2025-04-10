/**
 * Formats a file size from bytes into a human-readable string with appropriate units.
 *
 * @param bytes - The size in bytes to format
 * @returns A formatted string with the size and appropriate unit (B, KB, MB, GB)
 *
 * @example
 * formatFileSize(1024) // returns "1 KB"
 * formatFileSize(1536) // returns "1.5 KB"
 * formatFileSize(0) // returns "0 B"
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';

  const units = ['B', 'KB', 'MB', 'GB'];
  const k = 1024;
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  // Format with at most 2 decimal places
  const size = (bytes / Math.pow(k, i)).toFixed(2);

  // Remove trailing zeros and decimal point if whole number
  const formattedSize = parseFloat(size).toString();

  return `${formattedSize} ${units[i]}`;
};
