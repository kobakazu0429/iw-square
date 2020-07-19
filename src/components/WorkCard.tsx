import React, { FC } from "react";
import styled from "styled-components";
import useLazyloadRef from "use-lazyload-ref";
import { Tag } from "./Tag";
import { Creator, Tag as TagType } from "../microcms/type";
import { createCloudinaryUrl } from "../cloudinary/util";

interface Props {
  publicId: string;
  title: string;
  creator: Creator;
  tags: TagType[];
}

const IMAGE_HEIGHT = 300;

export const WorkCard: FC<Props> = ({ publicId, title, creator, tags }) => {
  const [ref, hasLoaded] = useLazyloadRef();
  return (
    <>
      <Wrapper>
        <Img
          ref={ref}
          data-src={createCloudinaryUrl({ height: IMAGE_HEIGHT, publicId })}
        />
        {hasLoaded && (
          <Content>
            <WorkInfo>
              {title} / {creator.name}
            </WorkInfo>
            <br />
            {tags.map(({ tag, id }) => (
              <Tag tag={tag} key={id} />
            ))}
          </Content>
        )}
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  position: relative;
  height: ${IMAGE_HEIGHT}px;
  margin: 3px;
  flex-grow: 1;
  position: relative;
`;

const Img = styled.img`
  height: ${IMAGE_HEIGHT}px;
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
