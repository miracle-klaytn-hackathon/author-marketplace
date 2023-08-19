import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "components/button/button";
import { ReactComponent as ArrowTopIcon } from "assets/images/ArrowTopIcon.svg";

const Styled = {
  CustomButton: styled(Button)<{ $isVisible?: boolean }>`
    display: ${({ isVisible }) => (isVisible ? "block" : "none")};
    position: fixed;
    bottom: 100px;
    right: 120px;
    @media (max-width: 1200px) {
      bottom: 50px;
      right: 40px;
    }
    svg {
      position: relative;
      top: 3px;
    }
  `,
};

function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show the button when the user has scrolled down 200 pixels
    function handleScroll() {
      if (window.pageYOffset > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }

    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleClick() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <Styled.CustomButton
      icon={<ArrowTopIcon />}
      text="Scroll to top"
      white
      isVisible={isVisible}
      onClick={handleClick}
    />
  );
}

export default ScrollToTopButton;
