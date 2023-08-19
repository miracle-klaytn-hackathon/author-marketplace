/* PRIVATE ROUTE: AUTHENTICATION
   ========================================================================== */

import { Navigate, useLocation } from "react-router-dom";

import ROUTES from "routes/constant";
import { useMemo } from "react";
import useSessionStorage from "hooks/useSessionStorage";

interface IAuthRouteProps {
  children: JSX.Element;
}

/**
 * A wrapper around the element which checks if the user is authenticated
 * If authenticated, renders the passed element
 * If not authenticated, redirects the user to Login page.
 */
const AuthRoute = ({ children }: IAuthRouteProps) => {
  const location = useLocation();

  /**
   * Authentication logic
   * Feel free to modify authentication logic by saving JWT in cookie or localStorage
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [refreshToken, initialValue, isLoaded] = useSessionStorage<
    string | null
  >("refresh-token", null);

  // const refreshToken = window.sessionStorage.getItem("refresh-token");
  // const isAuthenticated = !!refreshToken;

  const isAuthenticated = useMemo(() => {
    return !!refreshToken;
  }, [refreshToken]);

  /**
   * Handle case when user is authenticated but attemp to access Login page
   * -> redirect to Homepage
   */

  if (!isLoaded) {
    return <div>Loading</div>;
  }

  // if (isAuthenticated && location.pathname === ROUTES.login) {
  //   return <Navigate to={ROUTES.home} />;
  // }

  // /**
  //  * Handle case when user is NOT authenticated but attemp to access Privated page
  //  * -> redirect to Login page
  //  */
  // if (!isAuthenticated && location.pathname !== ROUTES.login) {
  //   return <Navigate to={ROUTES.login} />;
  // }

  /**
   * Otherwise access Page as normal
   */
  return children;
};

export default AuthRoute;
