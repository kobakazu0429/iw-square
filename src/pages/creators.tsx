import React from "react";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import styled from "styled-components";
import { creatorsClient } from "../microcms/creators";
import { Creator as CreatorType } from "../microcms/type";
import { Header } from "../layouts/Header";
import { Creator } from "../components/Creator";
import { HeroArea } from "../components/HeroArea";

interface ServerSideProps {
  creators: CreatorType[];
}

type Props = ServerSideProps;

// eslint-disable-next-line react/display-name
export default (props: Props) => {
  return (
    <>
      <Header />
      <HeroArea text="Creators" backgroundImage="images/creators.jpg" />
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
