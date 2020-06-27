import React from "react";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { Divider } from "semantic-ui-react";
import { AdminContainer } from "../../components/admin/Container";
import { Tag } from "../../microcms/type";
import { tagsClient } from "../../microcms/tags";
import { TagsTable } from "../../components/admin/TagsTable";
import { AddTagForm } from "../../components/admin/TagForm";
import { AdminMessage } from "../../components/admin/Message";

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
        <AdminMessage />
        <Divider />
        <AddTagForm />
        <Divider />
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
