import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchPosts,
  selectAllPosts,
  selectPostsStatus,
  selectPostsError,
  selectCurrentSubreddit,
} from './postsSlice';
import Post from './Post.jsx';
import PostLoading from './PostLoading.jsx';
import Error from '../../components/Error.jsx';

/**
 * Displays a list of posts.
 * This component dispatches an action to fetch posts when it first renders
 * and selects the posts, loading status, and any errors from the Redux store.
 * It conditionally renders a loading indicator, an error message, or the list of posts
 * based on the current status.
 */
const Posts = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const status = useSelector(selectPostsStatus);
  const error = useSelector(selectPostsError);
  const currentSubreddit = useSelector(selectCurrentSubreddit);

  useEffect(() => {
    // Only fetch posts if the status is 'idle' to prevent re-fetching on every render
    if (status === 'idle') {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  let content;

  if (status === 'loading') {
    // Create an array of 10 to render 10 skeleton loaders
    content = Array(10)
      .fill(0)
      .map((_, i) => <PostLoading key={i} />);
  } else if (status === 'succeeded') {
    content = posts.map((post) => <Post key={post.id} post={post} />);
  } else if (status === 'failed') {
    content = <Error message={error} onRetry={() => dispatch(fetchPosts(currentSubreddit))} />;
  }

  return <section>{content}</section>;
};

export default Posts;
