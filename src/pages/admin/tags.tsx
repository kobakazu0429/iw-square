import React from "react";
import { AdminContainer } from "../../components/admin/Container";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { Tag } from "../../microcms/type";
import { tagsClient } from "../../microcms/tags";
import { TagsTable } from "../../components/admin/TagsTable";

interface ServerSideProps {
  tags: Tag[];
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props extends ServerSideProps {}

// eslint-disable-next-line react/display-name
export default (props: Props) => {
  return (
    <AdminContainer>
      <div>
        <h1>tags</h1>
        <TagsTable tags={props.tags} />
      </div>
    </AdminContainer>
  );
};

export async function getServerSideProps(
  _ctx: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<ServerSideProps>> {
  const tags = await tagsClient.fetchAllTags();
  return {
    props: {
      tags,
    },
  };
}
