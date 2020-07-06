import React, { FC } from "react";
import styled from "styled-components";
import { Image as CloudinaryImage } from "cloudinary-react";
import { Tag } from "./Tag";
import { Creator, Tag as TagType } from "../microcms/type";

interface Props {
  publicId: string;
  title: string;
  creator: Creator;
  tags: TagType[];
}

export const WorkCard: FC<Props> = ({ publicId, title, creator, tags }) => {
  return (
    <Wrapper>
      <Img publicId={publicId} />

      <Content>
        <WorkInfo>
          {title} / {creator.name}
        </WorkInfo>
        <br />
        {tags.map(({ tag, id }) => (
          <Tag tag={tag} key={id} />
        ))}
      </Content>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  height: 300px;
  margin: 3px;
  flex-grow: 1;
  position: relative;
`;

const Img = styled(CloudinaryImage)`
  height: 300px;
  object-fit: cover;
  max-width: 100%;
  min-width: 100%;
  vertical-align: bottom;
`;

const Content = styled.div`
  background-color: rgba(255, 255, 255, 0.7);
  padding: 2px;
  width: 100%;
  position: absolute;
  bottom: 0;
  right: 0;
`;

const WorkInfo = styled.span``;
