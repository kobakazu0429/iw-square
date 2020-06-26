import React from "react";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { Message, Divider } from "semantic-ui-react";
import { AdminContainer } from "../../components/admin/Container";
import { Tag } from "../../microcms/type";
import { tagsClient } from "../../microcms/tags";
import { TagsTable } from "../../components/admin/TagsTable";
import { AddTagForm } from "../../components/admin/TagForm";

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
        <Message warning>
          <Message.Header>ご注意ください！</Message.Header>
          <p>現在、編集・削除をすることができません！</p>
          <p>編集・削除をしたい場合はシステム管理者に連絡してください。</p>
          <p>登録は慎重にお願いします。</p>
        </Message>
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
