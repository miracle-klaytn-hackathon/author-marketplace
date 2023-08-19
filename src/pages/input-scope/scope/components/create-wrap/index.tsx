import Score1Form from "../form";
import Styled from "./index.style";

const Score1CreationComponent = () => {
  return (
    <Styled.Container>
      <Styled.Title>
        <span className="title">SCOPE 1</span> - Add New Input
      </Styled.Title>
      <Score1Form isCreate />
    </Styled.Container>
  );
};

export default Score1CreationComponent;
