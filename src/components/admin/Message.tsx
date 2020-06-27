import React, { FC } from "react";
import { Message } from "semantic-ui-react";

// eslint-disable-next-line react/display-name
export const AdminMessage: FC = (_props) => {
  return (
    <Message warning>
      <Message.Header>ご注意ください！</Message.Header>
      <p>現在、編集・削除をすることができません！</p>
      <p>編集・削除をしたい場合はシステム管理者に連絡してください。</p>
      <p>登録は慎重にお願いします。</p>
    </Message>
  );
};
