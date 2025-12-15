import React from 'react';

/**
 * A skeleton loading component for a single subreddit list item.
 * It mimics the layout with a placeholder icon and text, including a shimmer animation.
 */
const SubredditLoading = () => {
  return (
    <li className="subreddit-loading-item">
      <div className="loading-placeholder shimmer subreddit-icon-placeholder"></div>
      <div className="loading-placeholder shimmer subreddit-text-placeholder"></div>
    </li>
  );
};

export default SubredditLoading;