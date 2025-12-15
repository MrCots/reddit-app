import './App.css'
import { useSelector } from 'react-redux';
import Posts from '../features/posts/Posts.jsx';
import Search from '../features/search/Search.jsx';
import Subreddits from '../features/subreddits/Subreddits.jsx';
import PostDetail from '../features/posts/PostDetail.jsx';
import { selectSelectedPost } from '../features/posts/postsSlice.js';

/**
 * The main application component.
 * It renders the header, which includes the application title and a search bar,
 * and the main content area where the posts are displayed.
 */
function App() {
  const selectedPost = useSelector(selectSelectedPost);

  return (
    <div>
      <header>
        <h1>Reddit Popular</h1>
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
