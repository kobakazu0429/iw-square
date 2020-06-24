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
import { Work } from "../../microcms/type";
import { toJST } from "../../utils/toJST";

// TODO: タグのロジック修正
// TODO: eslint@7.3でcreatorのエラーが治るはず
const WorkTableRow: FC<{ work: Work }> = (props) => {
  return (
    <TableRow>
      <TableCell>{props.work.id}</TableCell>
      <TableCell>{props.work.title}</TableCell>
      <TableCell>{props.work.image_url}</TableCell>
      <TableCell>{props.work.tags.map((v) => v.tag).join(", ")}</TableCell>
      <TableCell>{props.work.creator?.name ?? "no name"}</TableCell>
      <TableCell>
        {props.work.status === "public"
          ? "公開中"
          : props.work.status === "pending"
          ? "保留中"
          : "非公開"}
      </TableCell>
      <TableCell>{toJST(props.work.createdAt)}</TableCell>
      <TableCell>{toJST(props.work.updatedAt)}</TableCell>
      <TableCell>
        <Button icon="edit" content="編集する" labelPosition="left" />
      </TableCell>
    </TableRow>
  );
};

export const WorksTable: FC<{ works: Work[] }> = (props) => {
  return (
    <Table striped>
      <TableHeader>
        <TableRow>
          <TableHeaderCell>コンテンツID</TableHeaderCell>
          <TableHeaderCell>タイトル</TableHeaderCell>
          <TableHeaderCell>画像</TableHeaderCell>
          <TableHeaderCell>タグ</TableHeaderCell>
          <TableHeaderCell>作者</TableHeaderCell>
          <TableHeaderCell>状態</TableHeaderCell>
          <TableHeaderCell>作成日</TableHeaderCell>
          <TableHeaderCell>更新日</TableHeaderCell>
          <TableHeaderCell></TableHeaderCell>
        </TableRow>
      </TableHeader>

      <TableBody>
        {props.works.map((work) => (
          <WorkTableRow key={work.id} work={work} />
        ))}
      </TableBody>
    </Table>
  );
};
