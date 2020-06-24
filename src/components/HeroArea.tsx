import React, { FC } from "react";
import styled from "styled-components";

interface Props {
  text: string;
  backgroundImage: string;
}

export const HeroArea: FC<Props> = ({ text, backgroundImage }) => {
  console.log(backgroundImage);
  return (
    <>
      <StyledHeroArea backgroundImage={backgroundImage}>
        <h1>{text}</h1>
      </StyledHeroArea>

      {/* <MobileDesign>
        <StyledMobileHeroArea backgroundImage={backgroundImage}>
          <h1>{text}</h1>
        </StyledMobileHeroArea>
      </MobileDesign> */}
    </>
  );
};

const StyledHeroArea = styled.div<{ backgroundImage: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${({ backgroundImage }) => backgroundImage});
  height: 450px;
  h1 {
    font-size: 120px;
    color: #fff;
    text-shadow: 2px 4px 3px rgba(0, 0, 0, 0.5);
  }
`;

// const StyledMobileHeroArea = styled.div<{ backgroundImage: string }>`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   background-image: url(${({ backgroundImage }) => backgroundImage});
//   height: 30vh;
//   h1 {
//     font-size: 70px;
//     color: #fff;
//     text-shadow: 2px 4px 3px rgba(0, 0, 0, 0.5);
//   }
// `;
