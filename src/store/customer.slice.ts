import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getListCustomer } from "api/customer/customer.api";
import { CustomerRes } from "api/customer/customer.interface";

const initialState = {
  listCustomer: [] as CustomerRes[],
  cartList: [] as any,
  isLoading: false,
  error: "",
};

const actions = {
  getListCustomer: createAsyncThunk(
    "POST/GET_LIST_customer",
    async (_, { rejectWithValue }) => {
      const response = await getListCustomer();
      if (response.status < 200 || response.status >= 300) {
        return rejectWithValue(response);
      }
      return response as unknown as CustomerRes[];
    }
  ),
  actionCart: createAsyncThunk(
    "POST/ACTION_CART",
    async (newListCart: any, { rejectWithValue }) => {
      localStorage.setItem("cartList", JSON.stringify(newListCart));
      return newListCart;
    }
  ),
};

const customer = createSlice({
  name: "getListCustomer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(actions.getListCustomer.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(actions.getListCustomer.fulfilled, (state, action) => {
      state.isLoading = false;
      state.listCustomer = action.payload;
    });
    builder.addCase(actions.getListCustomer.rejected, (state, action: any) => {
      state.isLoading = false;
      state.error = action.payload?.message;
    });
    builder.addCase(actions.actionCart.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(actions.actionCart.fulfilled, (state, action) => {
      state.isLoading = false;
      state.cartList = action.payload;
    });
    builder.addCase(actions.actionCart.rejected, (state, action: any) => {
      state.isLoading = false;
      state.error = action.payload?.message;
    });
  },
});

/**
 * Export all actions, reducer for customer
 */
export const customerActions = { ...customer.actions, ...actions };

export default customer.reducer;
