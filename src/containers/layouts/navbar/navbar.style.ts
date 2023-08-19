/* LAYOUT NAVBAR COMPONENT STYLES
   ========================================================================== */

import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { Popover } from "@mui/material";

const Styled = {
  Container: styled.header`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9;
    background: ${({ theme }) => theme.colors.white};
    border-bottom: 1px solid ${({ theme }) => theme.colors.blacks10};
    box-shadow: inset 0px -1px 0px #f3f3f4;
    padding: 0 60px;
  `,

  NavBar: styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 42px;
    align-items: center;
  `,
  WrapLogo: styled.div``,
  Logo: styled.img`
    cursor: pointer;
  `,
  Nav: styled.div`
    overflow: hidden;
    overflow-x: auto;

    &::-webkit-scrollbar {
      display: none;
    }
  `,

  List: styled.ul`
    display: flex;
    align-items: center;
    list-style: none;
    justify-content: end;
    min-width: 840px;

    & > li:not(:last-child) {
      margin-right: 4px;
    }
  `,
  Item: styled.li`
    display: inherit;
    position: relative;
  `,

  Link: styled.span`
    display: block;
    padding: 20px;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 142.857% */
    color: ${({ theme }) => theme.colors.blacks60};
    transition: all 0.3s ease-in-out;
    cursor: pointer;

    &.active-nav {
      border-bottom: 1px solid ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.primary};
    }

    &:hover {
      border-bottom: 1px solid ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.primary};
      /* background-color:${({ theme }) => theme.colors.primary_light}; */
    }
  `,

  Notification: styled.span`
    display: flex;
    align-items: center;
  `,

  User: styled.div`
    display: flex;
    align-items: center;
    padding: 10px;
    transition: all 0.3s ease-in-out;
    cursor: pointer;
    position: relative;

    &:hover {
      background-color: ${({ theme }) => theme.colors.primary_light};
    }
  `,
  ImageUser: styled.img`
    width: 40px;
    height: 40px;
    min-height: 40px;
    min-width: 40px;
    border: 1px solid ${({ theme }) => theme.colors.blacks20};
    border-radius: 50%;
  `,
  NameUser: styled.div`
    display: flex;
    align-items: center;

    svg {
      color: ${({ theme }) => theme.colors.text4};
    }
  `,
  Name: styled.span`
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    margin: 0 12px;
    color: ${({ theme }) => theme.colors.text1};
  `,

  PopoverC: styled(Popover)`
    box-shadow: 0px 1px 4px 0px #cccccc !important;
    border: 1px solid ${({ theme }) => theme.colors.blacks10};

    .color-primary {
      background-color: ${({ theme }) => theme.colors.primary} !important;
      color: ${({ theme }) => theme.colors.white} !important;
    }
  `,

  PopupNav: styled.div`
    min-width: 200px;
    background: ${({ theme }) => theme.colors.white};
    border-radius: 0 0 4px 4px;
  `,
  ListOptions: styled.ul`
    list-style: none;

    & > li:not(:last-child) {
      border-bottom: 1px solid ${({ theme }) => theme.colors.blacks10};
    }
  `,
  Option: styled.li``,
  OptionLink: styled(NavLink)`
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    display: block;
    padding: 12px 10px;
    transition: all 0.3s ease-in-out;
    text-align: center;
    color: ${({ theme }) => theme.colors.blacks60};

    &:hover {
      background-color: ${({ theme }) => theme.colors.primary_light};
    }
  `,
};

export default Styled;
