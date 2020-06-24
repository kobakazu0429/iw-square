import React from "react";
import { AdminContainer } from "../../components/admin/Container";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { worksClient } from "../../microcms/works";
import { Work } from "../../microcms/type";
import { WorksTable } from "../../components/admin/WorksTable";

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
        <WorksTable works={props.works} />
      </div>
    </AdminContainer>
  );
};

export async function getServerSideProps(
  _ctx: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<ServerSideProps>> {
  const res = await worksClient.fetchAllWorks();
  return {
    props: {
      works: res,
    },
  };
}
