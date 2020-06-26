import React, { FC } from "react";
import styled from "styled-components";
import { Image as CloudinaryImage, Transformation } from "cloudinary-react";
import { Tag } from "./Tag";
import { Creator, Tag as TagType } from "../microcms/type";

interface Props {
  publicId: string;
  // creatorId: number;
  title: string;
  creator: Creator;
  tags: TagType[];
}

export const WorkCard: FC<Props> = ({ publicId, title, creator, tags }) => {
  return (
    <Wrapper>
      <Img cloudName="iw-square" publicId={publicId}>
        <Transformation crop="fill" height="200" width="200" />
      </Img>

      <Content>
        <CreatorName>{title}</CreatorName>
        <br />
        <CreatorName>{creator.name}</CreatorName>
        <br />
        {tags.map(({ tag, id }) => (
          <Tag tag={tag} key={id} />
        ))}
      </Content>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 30px;
  width: 200px;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 5px #ccc;
  display: inline-block;
  vertical-align: top;
`;

const Img = styled(CloudinaryImage)`
  border-radius: 5px 5px 0 0;
  max-width: 100%;
  height: auto;
`;

const Content = styled.div`
  padding: 20px;
  min-height: 120px;
`;

// .card-title {
//   font-size: 20px;
//   margin-bottom: 20px;
//   text-align: center;
//   color: #333;
// }
// .card-text {
//   color: #777;
//   font-size: 14px;
//   line-height: 1.5;
// }
// .card-link {
//   text-align: center;
//   border-top: 1px solid #eee;
//   padding: 20px;
// }
// .card-link a {
//   text-decoration: none;
//   color: #0bd;
//   margin: 0 10px;
// }
// .card-link a:hover {
//   color: #0090aa;
// }

const CreatorName = styled.span``;
