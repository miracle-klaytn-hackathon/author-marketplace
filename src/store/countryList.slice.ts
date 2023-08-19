import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCountryList } from "api/post/countryList.api";

interface ResponseCountry {
  data: string[];
  statusCode: number;
  message: string;
}

const initialState = {
  listCountry: [] as string[],
  isLoading: false,
  error: "",
};

const actions = {
  getCountryName: createAsyncThunk(
    "GET/LIST_COUNTRY_NAME",
    async (undefine, { rejectWithValue }) => {
      const response = await getCountryList();

      if (response.status < 200 || response.status >= 300) {
        return rejectWithValue(response);
      }

      return response as unknown as ResponseCountry;
    }
  ),
};

const country = createSlice({
  name: "country",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(actions.getCountryName.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(actions.getCountryName.fulfilled, (state, action) => {
      state.isLoading = false;
      state.listCountry = action.payload.data;
    });
    builder.addCase(actions.getCountryName.rejected, (state, action: any) => {
      state.isLoading = true;
      state.error = action.payload?.message || "Something Wen Wrong!";
    });
  },
});

export const countryActions = { ...country.actions, ...actions };
export default country.reducer;
