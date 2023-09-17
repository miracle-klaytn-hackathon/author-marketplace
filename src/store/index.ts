/* STORE
   ========================================================================== */

import { Provider, useDispatch, useSelector } from "react-redux";
import postDetailReducer, { postDetailActions } from "./post-detail.slice";
import postListReducer, { postListActions } from "./post-list.slice";
import companyReducer, { companyActions } from "./company.slice";
import categoryReducer, { categoryActions } from "./category.slice";
import customerReducer, { customerActions } from "./customer.slice";
import scopeReducer, { scopeActions } from "./scope.slice";
import signInReducer from "./login.slice";
import countryReducer, { countryActions } from "./countryList.slice";
import { configureStore } from "@reduxjs/toolkit";
import bookReducer, { bookActions } from './book.slice'

/**
 * Map actions
 */
const actions = {
  postList: postListActions,
  postDetail: postDetailActions,
  company: companyActions,
  category: categoryActions,
  customer: customerActions,
  scope: scopeActions,
  country: countryActions,
  book: bookActions
};

/**
 * Map reducers
 */
const reducers = {
  postList: postListReducer,
  postDetail: postDetailReducer,
  company: companyReducer,
  category: categoryReducer,
  customer: customerReducer,
  scope: scopeReducer,
  signIn: signInReducer,
  country: countryReducer,
  book: bookReducer
};

const store = configureStore({
  reducer: reducers,
});

export type TStore = ReturnType<typeof store.getState>;

/**
 * Export all neccessary features here to modulize,
 * so that all store features can be imported from 'store',
 * instead of importing from 'react-redux' and 'redux-toolkit' and so on
 */
export { Provider, useDispatch, useSelector, actions };

export default store;
