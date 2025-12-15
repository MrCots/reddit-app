import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (subreddit = 'popular', { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/r/${subreddit}.json`);
      const json = await response.json();
      return json.data.children.map((post) => post.data);
    } catch (error) {
      // Use rejectWithValue to return a specific error payload
      return rejectWithValue(error.message);
    }
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    selectedPost: null, // Holds the permalink of the selected post
    currentSubreddit: 'popular', // Holds the name of the currently displayed subreddit
  },
  reducers: {
    setSelectedPost: (state, action) => {
      state.selectedPost = action.payload;
    },
    clearSelectedPost: (state) => {
      state.selectedPost = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'loading';
        // When fetching starts, update the current subreddit based on the argument passed to fetchPosts
        state.currentSubreddit = action.meta.arg || 'popular';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });
  },
});

export const selectAllPosts = (state) => state.posts.posts;
export const selectPostsStatus = (state) => state.posts.status;
export const selectPostsError = (state) => state.posts.error;
export const selectSelectedPost = (state) => state.posts.selectedPost;
export const selectCurrentSubreddit = (state) => state.posts.currentSubreddit;

export const { setSelectedPost, clearSelectedPost } = postsSlice.actions;

export default postsSlice.reducer;
