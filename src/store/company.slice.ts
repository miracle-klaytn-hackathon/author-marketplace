import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getListCompanyFacility } from "api/company-profile/companyProfileList";
import { CompanyRes, IGetCompany } from "api/company-profile/company.interface";

const initialState = {
  listCompany: {} as CompanyRes,
  isLoading: false,
  error: "",
};

const actions = {
  getListCompanyFacility: createAsyncThunk(
    "POST/GET_LIST_COMPANY_FACILITY",
    async (params: IGetCompany, { rejectWithValue }) => {
      const response = await getListCompanyFacility(params);
      if (response.status < 200 || response.status >= 300) {
        return rejectWithValue(response.data);
      }
      return response.data as unknown as CompanyRes;
    }
  ),
};

const company = createSlice({
  name: "getListCompanyFacility",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(actions.getListCompanyFacility.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      actions.getListCompanyFacility.fulfilled,
      (state, action) => {
        state.isLoading = false;
        state.listCompany = action.payload;
      }
    );
    builder.addCase(
      actions.getListCompanyFacility.rejected,
      (state, action: any) => {
        state.isLoading = false;
        state.error = action.payload?.message;
      }
    );
  },
});

/**
 * Export all actions, reducer for company
 */
export const companyActions = { ...company.actions, ...actions };

export default company.reducer;
