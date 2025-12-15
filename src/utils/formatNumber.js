/**
 * Formats a number into a more readable string with 'k' for thousands
 * and 'm' for millions (e.g., 12100 becomes "12.1k").
 *
 * @param {number} num The number to format.
 * @returns {string} The formatted number as a string.
 */
export const formatNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'm';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
  }
  return num.toString();
};

