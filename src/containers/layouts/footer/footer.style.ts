/* LAYOUT FOOTER COMPONENT STYLES
   ========================================================================== */

import styled from "styled-components";

const Styled = {
  Footer: styled.footer`
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${({ theme }) => theme.colors.white};
    box-shadow: inset 0px 1px 0px #f3f3f4;
    height: 50px;
    padding: 0 60px;

    text-align: center;
    color: ${({ theme }) => theme.colors.text4};
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
  `,
};

export default Styled;
