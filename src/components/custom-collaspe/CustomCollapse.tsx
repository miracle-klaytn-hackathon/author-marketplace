import styled from "styled-components";
import { ReactComponent as ExpandDown } from "assets/images/ExpandDown.svg";
import { FC, ReactElement, useState } from "react";

const Styled = {
  Container: styled.div``,
  Header: styled.div<{ isOpen?: boolean }>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    .header {
      width: 100%;
    }
    .icon-expand {
      margin-left: 24px;
      transition: all 0.3s ease-in-out;
      transform: ${(props) => (props.isOpen ? "rotateZ(180deg)" : "initial")};
      cursor: pointer;
    }
  `,
  Content: styled.div<{ isOpen?: boolean }>`
    overflow: ${(props) => (props.isOpen ? "initial" : "hidden")};
    height: ${(props) => (props.isOpen ? "initial" : "0px !important")};
    transition: all ease 0.5s;
  `,
};
interface Props {
  header: ReactElement;
  children: ReactElement;
  collapseHeader?: boolean;
}
const CustomCollapse: FC<Props> = ({
  header,
  children,
  collapseHeader = false,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <Styled.Container>
      <Styled.Header
        isOpen={isOpen}
        onClick={() => {
          if (!collapseHeader) {
            return;
          }
          setIsOpen(!isOpen);
        }}
      >
        <div className="header">{header}</div>
        <ExpandDown
          className="icon-expand"
          onClick={(e) => {
            e?.stopPropagation?.();
            setIsOpen(!isOpen);
          }}
        />
      </Styled.Header>
      <Styled.Content isOpen={isOpen}>{children}</Styled.Content>
    </Styled.Container>
  );
};
export default CustomCollapse;
