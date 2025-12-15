import React from 'react';
import { useDispatch } from 'react-redux';
import { setSelectedPost } from './postsSlice';
import { formatNumber } from '../../utils/formatNumber.js';

/**
 * A component that renders a single post in a card format.
 * It displays the post's score (votes), thumbnail, title, author, and comment count.
 *
 * @param {object} props The component props.
 * @param {object} props.post The post data to display.
 */
const Post = ({ post }) => {
  const dispatch = useDispatch();

  const handlePostClick = () => {
    dispatch(setSelectedPost(post.permalink));
  };

  // A simple function to handle missing thumbnails
  const renderThumbnail = () => {
    if (post.thumbnail && post.thumbnail.startsWith('http')) {
      return <img src={post.thumbnail} alt={`${post.title} thumbnail`} className="post-thumbnail" />;
    }
    // You can return a placeholder image or nothing
    return <div className="post-thumbnail-placeholder"></div>;
  };

  return (
    <article className="post-card" onClick={handlePostClick}>
      <div className="post-votes">
        <span>▲</span>
        <strong>{formatNumber(post.score)}</strong>
        <span>▼</span>
      </div>
      {renderThumbnail()}
      <div className="post-content">
        <h3>{post.title}</h3>
        <p className="post-meta">Posted by {post.author} | {formatNumber(post.num_comments)} comments</p>
      </div>
    </article>
  );
};

export default Post;