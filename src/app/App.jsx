import './App.css'
import { useSelector } from 'react-redux';
import Posts from '../features/posts/Posts.jsx';
import Search from '../features/search/Search.jsx';
import Subreddits from '../features/subreddits/Subreddits.jsx';
import PostDetail from '../features/posts/PostDetail.jsx';
import { selectSelectedPost, selectCurrentSubreddit } from '../features/posts/postsSlice.js';

/**
 * The main application component.
 * It renders the header, which includes the application title and a search bar,
 * and the main content area where the posts are displayed.
 */
function App() {
  const currentSubreddit = useSelector(selectCurrentSubreddit);
  const selectedPost = useSelector(selectSelectedPost);

  return (
    <div>
      <header>
        {/* Display the current subreddit in the main heading */}
        <h1>Reddit /r/{currentSubreddit}</h1>
        <Search />
      </header>
      <div className="app-container">
        <main>
          <Posts />
        </main>
        <Subreddits />
      </div>
      {selectedPost && <PostDetail />}
    </div>
  )
}

export default App
