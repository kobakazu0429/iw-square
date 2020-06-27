import React, { FC } from "react";
import {
  Table,
  TableHeader,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  // Button,
  Image,
} from "semantic-ui-react";
import { Image as CloudinaryImage, Transformation } from "cloudinary-react";

import { Creator } from "../../microcms/type";

// TODO: eslint@7.3でcreatorのエラーが治るはず
const CreatorTableRow: FC<{ creator: Creator }> = (props) => {
  return (
    <TableRow>
      <TableCell>{props.creator.id}</TableCell>
      <TableCell>
        <Image avatar>
          <CloudinaryImage publicId={props.creator.icon}>
            <Transformation crop="fill" height="100" width="100" />
          </CloudinaryImage>
        </Image>
        <span>{props.creator.name}</span>
      </TableCell>
      <TableCell>
        <a href={`https://twitter.com/${props.creator.twitter_id}`}>
          {props.creator.twitter_id}
        </a>
      </TableCell>
      <TableCell>
        <a href={`https://www.facebook.com/${props.creator.facebook_id}`}>
          {props.creator.facebook_id}
        </a>
      </TableCell>
      {/* <TableCell>
        <Button icon="edit" content="編集する" labelPosition="left" />
      </TableCell> */}
    </TableRow>
  );
};

export const CreatorsTable: FC<{ creators: Creator[] }> = (props) => {
  return (
    <Table striped>
      <TableHeader>
        <TableRow>
          <TableHeaderCell>コンテンツID</TableHeaderCell>
          <TableHeaderCell>名前</TableHeaderCell>
          <TableHeaderCell>Twitter</TableHeaderCell>
          <TableHeaderCell>Facebook</TableHeaderCell>
          {/* <TableHeaderCell></TableHeaderCell> */}
        </TableRow>
      </TableHeader>

      <TableBody>
        {props.creators.map((creator) => (
          <CreatorTableRow key={creator.id} creator={creator} />
        ))}
      </TableBody>
    </Table>
  );
};
