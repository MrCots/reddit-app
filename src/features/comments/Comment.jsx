import React from 'react';

/**
 * A component that renders a single comment.
 *
 * @param {object} props The component props.
 * @param {object} props.comment The comment data to display.
 */
const Comment = ({ comment }) => {
  return (
    <div className="comment">
      <p className="comment-author">{comment.author}</p>
      <p>{comment.body}</p>
    </div>
  );
};

export default Comment;