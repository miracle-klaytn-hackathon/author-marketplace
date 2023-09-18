import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BookToken, getBookToken, getBookTokens } from 'api/tokens/token'

const initialState = {
  bookToken: {} as BookToken,
  isLoading: false,
  error: "",
};

const actions = {
  getDetail: createAsyncThunk(
    "POST/GET_Book_Detail",
    async (address: string, { rejectWithValue }) => {
      const response = await getBookToken(address);
      if (response.status < 200 || response.status >= 300) {
        return rejectWithValue(response.data);
      }
      return response.data as unknown as BookToken;
    }
  )
};

const bookDetailSlice = createSlice({
  name: "bookDetailSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(actions.getDetail.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(actions.getDetail.fulfilled, (state, action) => {
      state.isLoading = false;
      state.bookToken = action.payload;
    });
    builder.addCase(actions.getDetail.rejected, (state, action: any) => {
      state.isLoading = false;
      state.error = action.payload?.message;
    });
  },
});

/**
 * Export all actions, reducer for customer
 */
export const bookDetailActions = { ...bookDetailSlice.actions, ...actions };

export default bookDetailSlice.reducer;
