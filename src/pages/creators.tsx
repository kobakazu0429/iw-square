import React from "react";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import Head from "next/head";
import styled from "styled-components";
import { creatorsClient } from "../microcms/creators";
import { Creator as CreatorType } from "../microcms/type";
import { Header } from "../layouts/Header";
import { Creator } from "../components/Creator";
import { HeroArea, HERO_AREA_HEIGHT } from "../components/HeroArea";
import { createCloudinaryUrl } from "../cloudinary/util";

interface ServerSideProps {
  creators: CreatorType[];
}

type Props = ServerSideProps;

const HERO_AREA_IMAGE_PATH = createCloudinaryUrl({
  height: HERO_AREA_HEIGHT,
  publicId: "creators_wacofe",
});

// eslint-disable-next-line react/display-name
export default (props: Props) => {
  return (
    <>
      <Head>
        <title>インキュベーションスクエア - Creators</title>
      </Head>
      <Header />
      <HeroArea text="Creators" backgroundImage={HERO_AREA_IMAGE_PATH} />
      <Container>
        {props.creators.map(({ id, name, icon }) => (
          <Creator name={name} skills={[]} iconPublicId={icon} key={id} />
        ))}
      </Container>
    </>
  );
};
export async function getServerSideProps(
  _ctx: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<ServerSideProps>> {
  const creators = await creatorsClient.fetchAllCreators();
  return {
    props: {
      creators,
    },
  };
}

const Container = styled.div`
  width: 100%;
  height: auto;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`;
