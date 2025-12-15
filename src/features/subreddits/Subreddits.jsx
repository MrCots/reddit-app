import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchSubreddits,
  selectAllSubreddits,
  selectSubredditsStatus,
  selectSubredditsError,
} from './subredditsSlice';
import { fetchPosts, selectCurrentSubreddit } from '../posts/postsSlice';
import SubredditLoading from './SubredditLoading';
import Error from '../../components/Error.jsx';

/**
 * A component that displays a list of popular subreddits.
 * Users can click on a subreddit to view its posts.
 */
const Subreddits = () => {
  const dispatch = useDispatch();
  const subreddits = useSelector(selectAllSubreddits);
  const status = useSelector(selectSubredditsStatus);
  const error = useSelector(selectSubredditsError);
  const currentSubreddit = useSelector(selectCurrentSubreddit);

  useEffect(() => {
    dispatch(fetchSubreddits());
  }, [dispatch]);

  const handleSubredditClick = (subredditUrl) => {
    // The subreddit name is the part of the URL after /r/
    const subredditName = subredditUrl.substring(3, subredditUrl.length - 1);
    dispatch(fetchPosts(subredditName));
  };

  // Conditionally render content based on the fetch status
  let content;
  if (status === 'loading') {
    content = (
      <ul>
        {Array(15)
          .fill(0)
          .map((_, i) => (
            <SubredditLoading key={i} />
          ))}
      </ul>
    );
  } else if (status === 'succeeded') {
    content = (
      <ul>
        {subreddits.map((subreddit) => (
          <li key={subreddit.id}>
            <button
              type="button"
              onClick={() => handleSubredditClick(subreddit.url)}
              className={subreddit.display_name === currentSubreddit ? 'active' : ''}
            >
              <img src={subreddit.icon_img || 'https://via.placeholder.com/25'} alt={`${subreddit.display_name} icon`} />
              {subreddit.display_name}
            </button>
          </li>
        ))}
      </ul>
    );
  } else if (status === 'failed') {
    content = <Error message="Failed to load subreddits." onRetry={() => dispatch(fetchSubreddits())} />;
  }

  return (
    <aside className="subreddits-panel">
      <h2>Subreddits</h2>
      {content}
    </aside>
  );
};

export default Subreddits;