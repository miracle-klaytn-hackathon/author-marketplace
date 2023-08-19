/* ERROR BOUNDARY COMPONENT
   ========================================================================== */

import { ReactNode } from "react";
import {
  ErrorBoundary as ErrorBoundaryLib,
  FallbackProps,
} from "react-error-boundary";
import Styled from "./error-boundary.style";

interface IErrorBoundaryProps {
  onReset: () => void;
  children: ReactNode;
}

const ErrorFallback = ({
  error,
  resetErrorBoundary,
}: FallbackProps): JSX.Element => {
  return (
    <Styled.Container>
      <Styled.Content>
        <Styled.Title>Whoops!</Styled.Title>
        <Styled.Description>
          Stuck in a blind spot. Reload to see the magic!
        </Styled.Description>
        <button onClick={resetErrorBoundary}>Reload</button>
      </Styled.Content>
    </Styled.Container>
  );
};

const ErrorBoundary = ({ onReset, children }: IErrorBoundaryProps) => {
  return (
    <ErrorBoundaryLib FallbackComponent={ErrorFallback} onReset={onReset}>
      {children}
    </ErrorBoundaryLib>
  );
};

export default ErrorBoundary;
