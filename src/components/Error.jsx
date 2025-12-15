import React from 'react';

/**
 * A component to display an error message and a retry button.
 *
 * @param {object} props The component props.
 * @param {string} props.message The error message to display.
 * @param {Function} props.onRetry The function to call when the retry button is clicked.
 */
const Error = ({ message, onRetry }) => {
  return (
    <div className="error-container">
      <h2>Something went wrong</h2>
      <p>{message}</p>
      <button onClick={onRetry}>Try Again</button>
    </div>
  );
};

export default Error;