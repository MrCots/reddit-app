import React from 'react';

/**
 * A skeleton loading component for a single comment.
 * It mimics the layout of a Comment with placeholder shapes and a shimmer animation.
 */
const CommentLoading = () => {
  return (
    <div className="comment-loading">
      <div className="loading-placeholder shimmer comment-author-placeholder"></div>
      <div className="loading-placeholder shimmer comment-body-placeholder"></div>
    </div>
  );
};

export default CommentLoading;
