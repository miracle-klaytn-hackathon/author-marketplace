import styled from "styled-components";
import Empty from "assets/images/empty-not-found 1.png";
import { ReactComponent as IconInformative } from "assets/images/Informative.svg";
import { ReactNode } from "react";

const Styled = {
  Container: styled.div`
    margin-top: 28px;
    padding: 40px;
  `,
  Box: styled.div`
    text-align: center;
  `,
  Image: styled.img``,
  Title: styled.p`
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 28px; /* 155.556% */
    color: ${({ theme }) => theme.colors.text1};
    margin-bottom: 8px;
    margin-top: 16px;
  `,
  WrapMessage: styled.div`
    margin: 0 auto;
    margin-bottom: 16px;
    max-width: 796px;
    display: flex;
    align-items: center;
  `,
  Icon: styled.span`
    margin-right: 12px;
  `,
  Message: styled.span`
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px; /* 150% */
    color: ${({ theme }) => theme.colors.text4};
    text-align: left;
  `,
  WrapButton: styled.div``,
};

interface Props {
  button?: ReactNode;
}

const FacilityEmpty = ({ button }: Props) => {
  return (
    <Styled.Container>
      <Styled.Box>
        <Styled.Image src={Empty} alt="" />
        <Styled.Title>Looks like you don’t have any facility yet.</Styled.Title>
        <Styled.WrapMessage>
          <Styled.Icon>
            <IconInformative />
          </Styled.Icon>
          <Styled.Message>
            Handy Tip: Creating ‘facilities’ enables an accurate breakdown of
            carbon management and reporting for each of your significant
            assets/sites/plants or business functions and subsidiaries.
          </Styled.Message>
        </Styled.WrapMessage>

        {button && <Styled.WrapButton>{button}</Styled.WrapButton>}
      </Styled.Box>
    </Styled.Container>
  );
};

export default FacilityEmpty;
