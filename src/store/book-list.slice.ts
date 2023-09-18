import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BookToken, getBookTokens } from 'api/tokens/token'

const initialState = {
  bookTokens: [] as BookToken[],
  isLoading: false,
  error: "",
};

const actions = {
  getRecommend: createAsyncThunk(
    "POST/GET_Recommend_Books",
    async (_, { rejectWithValue }) => {
      const response = await getBookTokens();
      if (response.status < 200 || response.status >= 300) {
        return rejectWithValue(response.data);
      }
      return response.data as unknown as BookToken[];
    }
  )
};

const bookListSlice = createSlice({
  name: "bookListSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(actions.getRecommend.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(actions.getRecommend.fulfilled, (state, action) => {
      state.isLoading = false;
      state.bookTokens = action.payload;
    });
    builder.addCase(actions.getRecommend.rejected, (state, action: any) => {
      state.isLoading = false;
      state.error = action.payload?.message;
    });
  },
});

/**
 * Export all actions, reducer for customer
 */
export const bookListActions = { ...bookListSlice.actions, ...actions };

export default bookListSlice.reducer;
