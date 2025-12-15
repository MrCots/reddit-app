import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

/**
 * An async thunk that fetches comments for a given post permalink.
 */
export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (permalink, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api${permalink}.json`);
      const json = await response.json();
      // The comments are in the second element of the response array
      return json[1].data.children.map((comment) => comment.data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    comments: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const selectComments = (state) => state.comments.comments;
export const selectCommentsStatus = (state) => state.comments.status;

export default commentsSlice.reducer;