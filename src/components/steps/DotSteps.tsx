import { FC } from "react";
import { styled } from "styled-components";

const Styled = {
  Wrap: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    .dot {
      margin: 0px 4px;
      background: #cccccc;
      border-radius: 50%;
      width: 8px;
      height: 8px;
      cursor: pointer;
    }
    .active {
      background-color: #59a52c;
    }
  `,
};

interface Props {
  steps: any;
  activeStep: any;
  onCheckStep: any;
}

const DotSteps: FC<Props> = ({ steps, activeStep, onCheckStep }: any) => {
  return (
    <Styled.Wrap>
      {steps?.map((step: any) => (
        <div
          className={`dot ${activeStep === step && "active"}`}
          key={step}
          onClick={() => onCheckStep(step)}
        />
      ))}
    </Styled.Wrap>
  );
};

export default DotSteps;
