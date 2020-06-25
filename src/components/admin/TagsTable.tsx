import React, { FC } from "react";
import {
  Table,
  TableHeader,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "semantic-ui-react";
import { Tag } from "../../microcms/type";
import { toJST } from "../../utils/toJST";

// TODO: eslint@7.3でtagのエラーが治るはず
const TagTableRow: FC<{ tag: Tag }> = (props) => {
  return (
    <TableRow>
      <TableCell>{props.tag.id}</TableCell>
      <TableCell>{props.tag.tag}</TableCell>
      <TableCell>{toJST(props.tag.createdAt)}</TableCell>
      <TableCell>{toJST(props.tag.updatedAt)}</TableCell>
      <TableCell>
        <Button icon="edit" content="編集する" labelPosition="left" />
      </TableCell>
    </TableRow>
  );
};

export const TagsTable: FC<{ tags: Tag[] }> = (props) => {
  return (
    <Table striped>
      <TableHeader>
        <TableRow>
          <TableHeaderCell>コンテンツID</TableHeaderCell>
          <TableHeaderCell>タグ</TableHeaderCell>
          <TableHeaderCell>作成日</TableHeaderCell>
          <TableHeaderCell>更新日</TableHeaderCell>
          <TableHeaderCell></TableHeaderCell>
        </TableRow>
      </TableHeader>

      <TableBody>
        {props.tags.map((tag) => (
          <TagTableRow key={tag.id} tag={tag} />
        ))}
      </TableBody>
    </Table>
  );
};
