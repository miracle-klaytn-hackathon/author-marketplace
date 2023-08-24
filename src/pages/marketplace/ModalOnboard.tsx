import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import Button from "components/button/button";
import { useMemo, useState } from "react";
import { styled } from "styled-components";

import { ReactComponent as ExpandRight } from "assets/images/Expand_right_green.svg";
import { ReactComponent as LogoHorizontal } from "assets/images/LogoHorizontal.svg";
import bgOnboard from "assets/images/bgOnboard.png";
import bgOnboard2 from "assets/images/bgOnboard2.png";
import DotSteps from "components/steps/DotSteps";

const Styled = {
  Wrap: styled.div`
    border-radius: 12px;
  `,
  BootstrapDialog: styled(Dialog)`
    border-radius: 12px;
    &.MuiDialog-paper {
      border-radius: 12px;
    }
    & .muidialogcontent-root {
      padding: 0px;
    }

    & .muidialogactions-root {
      padding: 0px;
    }
  `,

  WrapTitle: styled(DialogTitle)`
    color: ${({ theme }) => theme.colors.primary};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    padding-top: 48px !important;
    padding-bottom: 42px !important;
    svg {
      height: 32px;
      margin-left: 8px;
    }
  `,

  Content: styled(DialogContent)<any>`
    min-height: 450px;
    min-width: 680px;
    border: none !important;
    padding-top: 0px !important;
    background-image: ${({ bg }) => `url(${bg})`};
    background-size: 595.76px 355.03px;
    background-repeat: no-repeat;
    background-position: center;
    background-position-y: 85px;
    .link {
      color: #59a52c;
    }
  `,
  SubTitle: styled.div`
    font-size: 24px;
    line-height: 36px;
    text-align: center;
  `,

  GroupActions: styled(DialogActions)`
    padding-right: 86px !important;
    padding-bottom: 43px !important;
  `,

  BtnCancel: styled(Button)`
    padding: 8px 12px;
    border: none;
    color: #6b6b6b;
    min-width: 85px;
  `,
  BtnConfirm: styled(Button)`
    padding: 8px 12px;
    min-width: 85px;
    .wrap-text {
      display: flex;
      align-items: center;
      svg {
        margin-left: 8px;
      }
    }
  `,
};

export interface PropsConfirmation {
  open: boolean;
  onClose: () => void;
}

const ModalOnBoard = ({ open, onClose }: PropsConfirmation) => {
  const [activeStep, setActiveStep] = useState(1);

  const renderContentByStep = useMemo(() => {
    let stepContent = (
      <Styled.Content dividers bg={bgOnboard}>
        <Styled.SubTitle>
          We help you track your <span className="link">tCO2-e</span> precisely
        </Styled.SubTitle>
      </Styled.Content>
    );
    if (activeStep === 2) {
      stepContent = (
        <Styled.Content dividers bg={bgOnboard2}>
          <Styled.SubTitle>
            But first, let’s add your{" "}
            <span className="link">Company Facility </span> precisely
          </Styled.SubTitle>
        </Styled.Content>
      );
    }

    return stepContent;
  }, [activeStep]);
  return (
    <div>
      <Styled.BootstrapDialog
        maxWidth="md"
        onClose={onClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <Styled.Wrap>
          <Styled.WrapTitle>
            <span>Welcome to</span> <LogoHorizontal />
          </Styled.WrapTitle>

          {renderContentByStep}

          <div>
            <DotSteps
              steps={[1, 2]}
              activeStep={activeStep}
              onCheckStep={(step: any) => setActiveStep(step)}
            />
            <Styled.GroupActions>
              {activeStep === 1 && (
                <Styled.BtnConfirm
                  text={
                    <span className="wrap-text">
                      <span>Next</span>
                      <ExpandRight />
                    </span>
                  }
                  white
                  onClick={() => setActiveStep(2)}
                />
              )}
              {activeStep === 2 && (
                <Styled.BtnCancel
                  text="Back"
                  white
                  onClick={() => setActiveStep(1)}
                />
              )}
              {activeStep === 2 && (
                <Styled.BtnConfirm text="Start now" white onClick={onClose} />
              )}
            </Styled.GroupActions>
          </div>
        </Styled.Wrap>
      </Styled.BootstrapDialog>
    </div>
  );
};

export default ModalOnBoard;
