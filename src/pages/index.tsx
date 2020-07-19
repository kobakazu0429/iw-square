import React from "react";
import Head from "next/head";
import styled from "styled-components";
import { Header } from "../layouts/Header";
import { createCloudinaryUrl } from "../cloudinary/util";

// eslint-disable-next-line react/display-name
export default () => {
  return (
    <>
      <Head>
        <title>インキュベーションスクエア</title>
      </Head>
      <Header />
      <Container>
        <HeroArea>
          <HeroImg
            src={createCloudinaryUrl({
              publicId: "safe-is-first_tcgr8w",
            })}
            alt="私たちは安全を第一に考えています！"
          />
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
