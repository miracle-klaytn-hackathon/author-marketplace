/* LAYOUT DEFAULT COMPONENT
   ========================================================================== */

import Footer from "./footer/footer";
import Navbar from "./navbar/navbar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Styled from "./default.style";
import { Suspense, useEffect } from "react";
import ROUTES from "routes/constant";
import ScrollToTop from "components/ScrollToTop";
import { Dispatch } from "react";
import { actions, useDispatch } from "store";

const Default = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      actions.customer.actionCart(
        JSON.parse(localStorage.getItem("cartList") || "")
      )
    );
    if (location.pathname === ROUTES.home) {
      navigate(ROUTES.marketplace);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, navigate]);

  return (
    <Styled.Container>
      <ScrollToTop />
      <Navbar />
      <Styled.Main>
        <Suspense fallback={<></>}>
          <Outlet />
        </Suspense>
      </Styled.Main>
      <Footer />
    </Styled.Container>
  );
};

export default Default;
