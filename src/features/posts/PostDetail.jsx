import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectSelectedPost,
  clearSelectedPost,
  selectAllPosts,
} from './postsSlice';
import {
  fetchComments,
  selectComments,
  selectCommentsStatus,
} from '../comments/commentsSlice';
import Comment from '../comments/Comment.jsx';
import CommentLoading from '../comments/CommentLoading.jsx';

/**
 * A modal component that displays the full details of a selected post,
 * including its content and comments.
 */
const PostDetail = () => {
  const dispatch = useDispatch();
  const permalink = useSelector(selectSelectedPost);
  const allPosts = useSelector(selectAllPosts);
  const comments = useSelector(selectComments);
  const commentsStatus = useSelector(selectCommentsStatus);

  // Find the full post object from the list of all posts
  const post = allPosts.find((p) => p.permalink === permalink);

  useEffect(() => {
    if (permalink) {
      dispatch(fetchComments(permalink));
    }
  }, [permalink, dispatch]);

  const handleClose = () => {
    dispatch(clearSelectedPost());
  };

  if (!post) {
    return null;
  }

  const renderMedia = () => {
    if (post.is_video) {
      return (
        <video controls>
          <source src={post.media.reddit_video.fallback_url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );
    }
    if (post.url.match(/\.(jpeg|jpg|gif|png)$/)) {
      return <img src={post.url} alt={post.title} />;
    }
    return null;
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-button" onClick={handleClose}>
          &times;
        </button>
        <h2>{post.title}</h2>
        {renderMedia()}
        <div className="comments-section">
          <h3>Comments</h3>
          {commentsStatus === 'loading' && (
            <div>
              {/* Render 5 skeleton loaders for comments */}
              {Array(5)
                .fill(0)
                .map((_, i) => <CommentLoading key={i} />)}
            </div>
          )}
          {commentsStatus === 'succeeded' &&
            comments.map((comment) => (
              <Comment key={comment.id} comment={comment} />
            ))}
          {commentsStatus === 'failed' && <p>Failed to load comments.</p>}
        </div>
      </div>
    </div>
  );
};

export default PostDetail;