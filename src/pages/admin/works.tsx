import React from "react";
import { Divider } from "semantic-ui-react";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { AdminContainer } from "../../components/admin/Container";
import { worksClient } from "../../microcms/works";
import { Work, Creator, Tag } from "../../microcms/type";
import { WorksTable } from "../../components/admin/WorksTable";
import { AdminMessage } from "../../components/admin/AdminMessage";
import { NewWorkFormModal } from "../../components/admin/NewWorkrForm";
import { creatorsClient } from "../../microcms/creators";
import { tagsClient } from "../../microcms/tags";

interface ServerSideProps {
  works: Work[];
  creators: Creator[];
  tags: Tag[];
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
        <NewWorkFormModal creators={props.creators} tags={props.tags} />
        <Divider />
        <WorksTable works={props.works} />
      </div>
    </AdminContainer>
  );
};

export async function getServerSideProps(
  _ctx: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<ServerSideProps>> {
  const works = await worksClient.fetchAllWorks({ onlyPublic: false });
  const creators = await creatorsClient.fetchAllCreators();
  const tags = await tagsClient.fetchAllTags();
  return {
    props: {
      works,
      creators,
      tags,
    },
  };
}
