/* LAYOUT NAVBAR COMPONENT
   ========================================================================== */

import { useCallback, useMemo, useRef, useState } from "react";
import Styled from "./navbar.style";
import useSessionStorage from "hooks/useSessionStorage";
import Logo from "assets/images/Logo_Header.png";
import { ReactComponent as Notification } from "assets/images/Notiication.svg";
import cartIcon from "assets/images/shopping-cart.png";
import { ReactComponent as ExpandDown } from "assets/images/Expand_down.svg";
import ROUTES from "routes/constant";
import { useLocation, useNavigate } from "react-router-dom";
import Avatar from "assets/images/image-20230726-022407.png";
import { UserInfo } from "store/login.slice";
import ModalConnectWallet from "components/modal/ModalConnectWallet";
import { TStore, useSelector } from "store";

interface optionsPopup {
  label: string;
  to: string;
  onClick?: () => void;
}
interface PropsPopupNav {
  options: optionsPopup[];
  anchorEl: HTMLElement | null;
  onClose: () => void;
}

export const PopupNav = ({ options, anchorEl, onClose }: PropsPopupNav) => {
  const open = Boolean(anchorEl);
  const id = open ? "nav-popover" : undefined;
  const location = useLocation();

  const handleClose = (click?: () => void) => {
    onClose();
    click && click();
  };

  return (
    <Styled.PopoverC
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      <Styled.PopupNav>
        <Styled.ListOptions>
          {options.map((option) => (
            <Styled.Option key={option.to}>
              <Styled.OptionLink
                to={option.to}
                onClick={() => handleClose(option?.onClick)}
                className={
                  location.pathname.includes(option.to) ? "color-primary" : ""
                }
              >
                {option.label}
              </Styled.OptionLink>
            </Styled.Option>
          ))}
        </Styled.ListOptions>
      </Styled.PopupNav>
    </Styled.PopoverC>
  );
};

const Navbar = () => {
  const refScope = useRef(null);
  const refUser = useRef(null);
  const [anchorEl, setAnchorEl] = useState<HTMLLIElement | null>(null);
  const [currentName, setCurrentName] = useState("");
  const [modalConnectVisible, setmodalConnectVisible] = useState(false);
  const location = useLocation();
  const [userInfo, setUserInfo] = useSessionStorage<UserInfo | null>(
    "user",
    null
  );
  const { cartList } = useSelector((state: TStore) => state.customer);

  const navigate = useNavigate();
  const [, setRefreshToken] = useSessionStorage<string | null>(
    "refresh-token",
    null
  );

  const optionsScope = [
    { label: "Scope 1", to: "/scope1" },
    { label: "Scope 2", to: "/scope2" },
    { label: "Scope 3", to: "/scope3" },
  ];

  const handleLogout = useCallback(async () => {
    setRefreshToken(null);
    setUserInfo(null);
  }, [setRefreshToken, setUserInfo]);

  const optionsUser = useMemo(
    () => [
      { label: "Profile", to: "/user-profile" },
      { label: "Logout", to: ROUTES.login, onClick: handleLogout },
    ],
    [handleLogout]
  );

  const handleClickLogo = () => navigate(ROUTES.home);

  const handleClickItemManaScope = () => {
    setAnchorEl(refScope.current);
    setCurrentName("Scope");
  };

  const handlePopupUser = () => {
    setAnchorEl(refUser.current);
    setCurrentName("User");
  };

  const onClosePopup = () => {
    setAnchorEl(null);
    setCurrentName("");
  };

  return (
    <Styled.Container>
      <ModalConnectWallet
        open={modalConnectVisible}
        onClose={() => setmodalConnectVisible(false)}
      />
      <Styled.NavBar>
        <Styled.WrapLogo>
          <Styled.Logo
            src="https://opensea.io/static/images/logos/opensea-logo.svg"
            alt=""
            onClick={handleClickLogo}
          />
          Close sea
        </Styled.WrapLogo>

        <Styled.Nav>
          <Styled.List>
            <Styled.Item>
              <Styled.Link
                className={
                  location.pathname.includes(ROUTES.marketplace)
                    ? "active-nav"
                    : ""
                }
                onClick={() => navigate(ROUTES.marketplace)}
              >
                Marketplace
              </Styled.Link>
            </Styled.Item>
            <Styled.Item>
              <Styled.Link onClick={() => setmodalConnectVisible(true)}>
                Connect Wallet
              </Styled.Link>
            </Styled.Item>
            <Styled.Item>
              <Styled.Notification onClick={() => navigate(ROUTES.cart)}>
                <img src={cartIcon} alt="cartIcon" className="cart-icon" />
                {cartList?.length ? (
                  <div className="badge">{cartList?.length}</div>
                ) : null}
              </Styled.Notification>
            </Styled.Item>
            <Styled.Item>
              <Styled.Notification>
                <Notification />
              </Styled.Notification>
            </Styled.Item>
            <Styled.Item ref={refUser} onClick={handlePopupUser}>
              <Styled.User>
                <Styled.ImageUser src={Avatar} alt="" />
                <Styled.NameUser>
                  <Styled.Name>{userInfo?.accountName}</Styled.Name>
                  <ExpandDown />
                </Styled.NameUser>
              </Styled.User>
            </Styled.Item>
          </Styled.List>
        </Styled.Nav>
      </Styled.NavBar>
      {currentName && (
        <PopupNav
          anchorEl={anchorEl}
          onClose={onClosePopup}
          options={currentName === "User" ? optionsUser : optionsScope}
        />
      )}
    </Styled.Container>
  );
};

export default Navbar;
