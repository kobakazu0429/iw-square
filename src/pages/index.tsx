import React from "react";
import styled from "styled-components";
import { Header } from "../layouts/Header";

// eslint-disable-next-line react/display-name
export default () => {
  return (
    <>
      <Header />
      <Container>
        <HeroArea>
          <HeroImg src="/images/safe-is-first.jpg" />
        </HeroArea>
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 100%;
`;

const HeroArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HeroImg = styled.img`
  width: 100%;
`;
