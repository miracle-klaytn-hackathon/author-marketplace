import { forgotPassword } from "api/post/forgotPassword";
import React, { useCallback, useMemo, useEffect } from "react";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import ROUTES from "routes/constant";

const NavigateAuthToken = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = useMemo(() => searchParams.get("token"), [searchParams]);

  const foundToken = useCallback(() => {
    navigate(`${ROUTES.forgotPassword}/${ROUTES.tokenExpired}`);
  }, [navigate]);

  useEffect(() => {
    if (!token) {
      foundToken();
      return;
    }

    forgotPassword({ token })
      .then((res) => {
        if (!res.data) {
          foundToken();
          return;
        }

        navigate({
          pathname: `${ROUTES.forgotPassword}/${ROUTES.updatePassword}`,
          search: createSearchParams({
            token,
          }).toString(),
        });
      })
      .catch(() => {
        foundToken();
      });
  }, [foundToken, navigate, searchParams, token]);

  return <></>;
};

export default NavigateAuthToken;
