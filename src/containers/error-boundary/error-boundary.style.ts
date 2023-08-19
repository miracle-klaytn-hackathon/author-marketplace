/* ERROR BOUNDARY COMPONENT STYLES
   ========================================================================== */

import styled from "styled-components";

const Styled = {
  Container: styled.div`
    position: absolute;
    z-index: 3;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  `,
  Content: styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    padding: 20px 10px;
  `,
  Title: styled.h3`
    color: ${({ theme }) => theme.colors.primary};
  `,
  Description: styled.p`
    color: ${({ theme }) => theme.colors.text4};
  `,
};

export default Styled;
