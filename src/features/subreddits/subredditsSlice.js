import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

/**
 * An async thunk that fetches a list of popular subreddits from the Reddit API.
 */
export const fetchSubreddits = createAsyncThunk(
  'subreddits/fetchSubreddits',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/subreddits.json');
      const json = await response.json();
      return json.data.children.map((subreddit) => subreddit.data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const subredditsSlice = createSlice({
  name: 'subreddits',
  initialState: {
    subreddits: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubreddits.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSubreddits.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.subreddits = action.payload;
      })
      .addCase(fetchSubreddits.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const selectAllSubreddits = (state) => state.subreddits.subreddits;
export const selectSubredditsStatus = (state) => state.subreddits.status;
export const selectSubredditsError = (state) => state.subreddits.error;

export default subredditsSlice.reducer;