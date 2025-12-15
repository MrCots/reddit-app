import React from 'react';

/**
 * A skeleton loading component for a single post.
 * It mimics the layout of a Post card with placeholder shapes and a shimmer animation.
 */
const PostLoading = () => {
  return (
    <article className="post-card-loading">
      <div className="post-votes-loading">
        <div className="loading-placeholder shimmer"></div>
        <div className="loading-placeholder shimmer"></div>
        <div className="loading-placeholder shimmer"></div>
      </div>
      <div className="post-thumbnail-placeholder shimmer"></div>
      <div className="post-content-loading">
        <div className="loading-placeholder shimmer"></div>
        <div className="loading-placeholder shimmer"></div>
      </div>
    </article>
  );
};

export default PostLoading;