/* ROUTES COMPONENT
   ========================================================================== */

import AuthRoute from "containers/auth/AuthRoute";
import LayoutDefault from "containers/layouts/default";
import ROUTES from "./constant";
import { RouteObject } from "react-router-dom";
import React from "react";

/**
 * Lazy load page components. Fallback to <Loading /> when in loading phase
 */
const Login = React.lazy(() => import("pages/login"));
const TermsAndCondition = React.lazy(() => import("pages/terms-and-condition"));
const PageSignUp = React.lazy(() => import("pages/sign-up"));
const SignUp = React.lazy(() => import("pages/sign-up/SignUp"));
const SignUpSuccessfully = React.lazy(
  () => import("pages/sign-up/SignUpSuccessfully")
);
const PageForgotPassword = React.lazy(() => import("pages/forgot-password"));
const ForgotPassword = React.lazy(
  () => import("pages/forgot-password/ForgotPassword")
);
const ForgotPasswordSuccessfully = React.lazy(
  () => import("pages/forgot-password/ForgotPasswordSuccessfully")
);
const NavigateAuthToken = React.lazy(
  () => import("pages/forgot-password/NavigateAuthToken")
);
const ErrTokenExpired = React.lazy(() => import("pages/tokenExpired"));
const SenEmail = React.lazy(() => import("pages/forgot-password/SenEmail"));
const UpdatePassword = React.lazy(
  () => import("pages/forgot-password/UpdatePassword")
);
const NotFound = React.lazy(() => import("pages/not-found"));
const Report = React.lazy(() => import("pages/report"));
const Dashboard = React.lazy(() => import("pages/dashboard"));
const PageCompanyProfile = React.lazy(() => import("pages/company-profile"));
const CompanyProfile = React.lazy(
  () => import("pages/company-profile/CompanyProfile")
);
const EditCompanyProfile = React.lazy(
  () => import("pages/company-profile/edit-company-profile")
);
const UserProfile = React.lazy(() => import("pages/user-profile"));
const PageInputScope = React.lazy(() => import("pages/input-scope"));
const PageScopeOne = React.lazy(() => import("pages/input-scope/scope/Scope1"));
const PageScopeTow = React.lazy(() => import("pages/input-scope/scope/Scope2"));
const PageScope3 = React.lazy(() => import("pages/input-scope/scope/Scope3"));

const Score1CreationPage = React.lazy(
  () => import("pages/input-scope/scope/create")
);

const Score1EditPage = React.lazy(
  () => import("pages/input-scope/scope/detail")
);

/**
 * Use <AuthRoute /> to protect authenticate pages
 */
const routes: RouteObject[] = [
  {
    path: ROUTES.signUp,
    element: <PageSignUp />,
    children: [
      { path: ROUTES.signUp, element: <SignUp /> },
      { path: ROUTES.successfully, element: <SignUpSuccessfully /> },
    ],
  },
  {
    path: ROUTES.termsAndCondition,
    element: <TermsAndCondition />,
  },
  {
    path: ROUTES.forgotPassword,
    element: <PageForgotPassword />,
    children: [
      {
        path: ROUTES.forgotPassword,
        element: <ForgotPassword />,
        children: [
          { path: "", element: <SenEmail /> },
          { path: ROUTES.updatePassword, element: <UpdatePassword /> },
        ],
      },
      {
        path: ROUTES.authToken,
        element: <NavigateAuthToken />,
      },
      {
        path: ROUTES.successfully,
        element: <ForgotPasswordSuccessfully />,
      },
      {
        path: ROUTES.tokenExpired,
        element: <ErrTokenExpired />,
      },
    ],
  },

  {
    path: ROUTES.login,
    element: (
      <AuthRoute>
        <Login />
      </AuthRoute>
    ),
  },

  {
    path: ROUTES.home,
    element: (
      <AuthRoute>
        <LayoutDefault />
      </AuthRoute>
    ),
    children: [
      { index: true, path: ROUTES.dashboard, element: <Dashboard /> },
      { path: ROUTES.report, element: <Report /> },
      {
        path: ROUTES.companyProfile,
        element: <PageCompanyProfile />,
        children: [
          { path: "", element: <CompanyProfile /> },
          { path: ROUTES.edit, element: <EditCompanyProfile /> },
        ],
      },
      { path: ROUTES.userProfile, element: <UserProfile /> },
      { index: true, path: ROUTES.notfound, element: <NotFound /> },
      {
        path: ROUTES.inputScope1,
        element: <PageInputScope />,
        children: [
          { path: "", element: <PageScopeOne /> },
          {
            path: ROUTES.create,
            element: <Score1CreationPage />,
          },
          {
            path: ROUTES.scope1Detail,
            element: <Score1EditPage />,
          },
        ],
      },
      {
        path: ROUTES.inputScope2,
        element: <PageInputScope />,
        children: [
          { path: "", element: <PageScopeTow /> },
          {
            path: ROUTES.create,
            element: <Score1CreationPage />,
          },
          {
            path: ROUTES.scope2Detail,
            element: <Score1EditPage />,
          },
        ],
      },
      {
        path: ROUTES.inputScope3,
        element: <PageInputScope />,
        children: [
          { path: "", element: <PageScope3 /> },
          {
            path: ROUTES.create,
            element: <Score1CreationPage />,
          },
          {
            path: ROUTES.scope3Detail,
            element: <Score1EditPage />,
          },
        ],
      },
    ],
  },
];

export default routes;
