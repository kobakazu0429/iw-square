import React, { FC } from "react";
import styled from "styled-components";
import useLazyloadRef from "use-lazyload-ref";

interface Props {
  text: string;
  backgroundImage: string;
}

export const HERO_AREA_HEIGHT = 450;

export const HeroArea: FC<Props> = ({ text, backgroundImage }) => {
  const [ref] = useLazyloadRef();

  return (
    <StyledHeroArea
      ref={ref}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <h1>{text}</h1>
    </StyledHeroArea>
  );
};

const StyledHeroArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${HERO_AREA_HEIGHT}px;
  h1 {
    font-size: 120px;
    color: #fff;
    text-shadow: 2px 4px 3px rgba(0, 0, 0, 0.5);
  }

  @media only screen and (max-width: 480px) {
    display: none;
  }
`;
