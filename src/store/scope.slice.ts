import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getScopeDetail, getListScopeOneApi } from "api/scope-1/ScopeOne";
import { IGetListScope, IScopeDetail } from "api/scope-1/scope.interface";

const initialState = {
  listScopeOne: {} as any,
  savedParams: { page: 1, size: 10 } as IGetListScope,
  scopeDetail: {} as IScopeDetail,
  isLoading: false,
  error: "",
};

const actions = {
  getListScopeOne: createAsyncThunk(
    "POST/GET_LIST_SCOPE_ONE",
    async (params: IGetListScope, { rejectWithValue }) => {
      const response = await getListScopeOneApi(params);
      if (response.status < 200 || response.status >= 300) {
        return rejectWithValue(response?.data);
      }
      return response?.data as unknown as IScopeDetail;
    }
  ),
  getScopeDetail: createAsyncThunk(
    "POST/GET_SCOPE_DETAIL",
    async (id: string, { rejectWithValue }) => {
      const response = await getScopeDetail(id);
      if (response.status < 200 || response.status >= 300) {
        return rejectWithValue(response?.data);
      }
      return response?.data as unknown as IScopeDetail;
    }
  ),
};

const scope = createSlice({
  name: "scope",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(actions.getListScopeOne.pending, (state, { meta }) => {
      state.isLoading = true;
      state.savedParams = meta?.arg;
    });
    builder.addCase(actions.getListScopeOne.fulfilled, (state, action) => {
      state.isLoading = false;
      state.listScopeOne = action.payload;
    });
    builder.addCase(actions.getListScopeOne.rejected, (state, action: any) => {
      state.isLoading = false;
      state.error = action.payload?.message;
    });
    builder.addCase(actions.getScopeDetail.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(actions.getScopeDetail.fulfilled, (state, action) => {
      state.isLoading = false;
      state.scopeDetail = action.payload;
    });
    builder.addCase(actions.getScopeDetail.rejected, (state, action: any) => {
      state.isLoading = false;
      state.error = action.payload?.message;
    });
  },
});

/**
 * Export all actions, reducer for scope
 */
export const scopeActions = { ...scope.actions, ...actions };

export default scope.reducer;
