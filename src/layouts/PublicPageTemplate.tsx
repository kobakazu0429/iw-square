import React, { FC } from "react";
import Head from "next/head";
import styled from "styled-components";
import { Header } from "../layouts/Header";
import { Footer } from "../layouts/Footer";

interface Props {
  pageTitle: string;
}

export const PublicPageTemplate: FC<Props> = ({ pageTitle, children }) => (
  <>
    <Head>
      <title>{pageTitle}</title>
    </Head>
    <Wrapper>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </Wrapper>
  </>
);

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const Main = styled.main`
  flex: 1;
`;
