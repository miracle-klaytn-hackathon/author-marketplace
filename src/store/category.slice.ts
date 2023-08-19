import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getListCategory, getListInputType } from "api/category/category";
import { CategoryRes } from "api/category/category.interface";

const initialState = {
  listCategory: [] as CategoryRes[],
  listInputType: [] as CategoryRes[],
  isLoading: false,
  error: "",
};

const actions = {
  getListCategory: createAsyncThunk(
    "POST/GET_LIST_CATEGORY",
    async (typeScope: number, { rejectWithValue }) => {
      const response = await getListCategory(typeScope);
      if (response.status < 200 || response.status >= 300) {
        return rejectWithValue(response);
      }
      return response as unknown as CategoryRes[];
    }
  ),
  getListInputType: createAsyncThunk(
    "POST/GET_LIST_INPUT_TYPE",
    async (categoryId: string, { rejectWithValue }) => {
      const response = await getListInputType(categoryId);
      if (response.status < 200 || response.status >= 300) {
        return rejectWithValue(response);
      }
      return response as unknown as CategoryRes[];
    }
  ),
};

const category = createSlice({
  name: "getListCategory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(actions.getListCategory.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(actions.getListCategory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.listCategory = action.payload;
    });
    builder.addCase(actions.getListCategory.rejected, (state, action: any) => {
      state.isLoading = false;
      state.error = action.payload?.message;
    });
    builder.addCase(actions.getListInputType.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(actions.getListInputType.fulfilled, (state, action) => {
      state.isLoading = false;
      state.listInputType = action.payload;
    });
    builder.addCase(actions.getListInputType.rejected, (state, action: any) => {
      state.isLoading = false;
      state.error = action.payload?.message;
    });
  },
});

/**
 * Export all actions, reducer for category
 */
export const categoryActions = { ...category.actions, ...actions };

export default category.reducer;
