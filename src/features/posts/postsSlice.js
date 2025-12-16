import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

/**
 * An async thunk to fetch posts for a given subreddit.
 * It constructs the URL using the /api prefix to leverage the Vite proxy
 * and avoid CORS issues during development.
 */
export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (subreddit = 'popular') => {
    const response = await fetch(`/api/r/${subreddit}.json`);
    const json = await response.json();
    // Map over the children and return the data for each post
    return json.data.children.map((post) => post.data);
  }
);

const initialState = {
  posts: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  currentSubreddit: 'popular',
  selectedPost: null, // To track the permalink of the selected post
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // Reducer to set the selected post for the modal view
    setSelectedPost(state, action) {
      state.selectedPost = action.payload;
    },
    // Reducer to clear the selected post when the modal is closed
    clearSelectedPost(state) {
      state.selectedPost = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'loading';
        // Store the subreddit being fetched from the thunk's meta information
        state.currentSubreddit = action.meta.arg;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // When clearSelectedPost is dispatched, also clear the selected post state
      .addCase(postsSlice.actions.clearSelectedPost, (state) => {
        state.selectedPost = null;
      });
  },
});

// Export the new actions
export const { setSelectedPost, clearSelectedPost } = postsSlice.actions;

// Selectors
export const selectAllPosts = (state) => state.posts.posts;
export const selectPostsStatus = (state) => state.posts.status;
export const selectPostsError = (state) => state.posts.error;
export const selectCurrentSubreddit = (state) => state.posts.currentSubreddit;
export const selectSelectedPost = (state) => state.posts.selectedPost;

export default postsSlice.reducer;