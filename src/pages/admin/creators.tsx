import React from "react";
import { AdminContainer } from "../../components/admin/Container";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { Creator } from "../../microcms/type";
import { CreatorsTable } from "../../components/admin/CreatorsTable";
import { creatorsClient } from "../../microcms/creators";

interface ServerSideProps {
  creators: Creator[];
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props extends ServerSideProps {}

// eslint-disable-next-line react/display-name
export default (props: Props) => {
  return (
    <AdminContainer>
      <div>
        <h1>works</h1>
        <CreatorsTable creators={props.creators} />
      </div>
    </AdminContainer>
  );
};

export async function getServerSideProps(
  _ctx: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<ServerSideProps>> {
  const res = await creatorsClient.fetchAllCreators();
  return {
    props: {
      creators: res,
    },
  };
}
