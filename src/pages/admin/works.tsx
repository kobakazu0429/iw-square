import React from "react";
import { Divider } from "semantic-ui-react";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { AdminContainer } from "../../components/admin/Container";
import { worksClient } from "../../microcms/works";
import { Work } from "../../microcms/type";
import { WorksTable } from "../../components/admin/WorksTable";
import { AdminMessage } from "../../components/admin/Message";

interface ServerSideProps {
  works: Work[];
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props extends ServerSideProps {}

// eslint-disable-next-line react/display-name
export default (props: Props) => {
  return (
    <AdminContainer>
      <div>
        <h1>works</h1>
        <AdminMessage />
        <Divider />
        <Divider />
        <WorksTable works={props.works} />
      </div>
    </AdminContainer>
  );
};

export async function getServerSideProps(
  _ctx: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<ServerSideProps>> {
  const res = await worksClient.fetchAllWorks({ onlyPublic: false });
  return {
    props: {
      works: res,
    },
  };
}
