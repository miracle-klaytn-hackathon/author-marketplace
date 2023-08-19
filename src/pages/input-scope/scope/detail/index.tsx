import styled from "styled-components";
import Score1Form from "../components/form";

const Styled = {
  Container: styled.div`
    padding: 40px 60px;
  `,
  Title: styled.div`
    font-size: 20px;
    margin-bottom: 20px;
    color: #666666;
    .title {
      color: #59a52c;
    }
  `,
};

const Score1DetailComponent = () => {
  return (
    <Styled.Container>
      <Styled.Title>
        <span className="title">SCOPE 1</span> - Edit Input
      </Styled.Title>
      <Score1Form />
    </Styled.Container>
  );
};

export default Score1DetailComponent;
