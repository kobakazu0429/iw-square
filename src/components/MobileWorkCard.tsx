import React, { FC } from "react";
import styled from "styled-components";
import { Tag } from "./Tag";

interface Props {
  productImage: string;
  // creatorId: number;
  title: string;
  creator: string;
  tags: string[];
}

export const MobileWorkCard: FC<Props> = ({
  productImage,
  title,
  creator,
  tags,
}) => {
  return (
    <Wrapper>
      <ImgWrapper>
        <Img src={productImage} />
      </ImgWrapper>
      <Detail>
        <Line>{title}</Line>
        <Line>{creator}</Line>
        {tags.map((tag) => (
          <Tag tag={tag} key={tag} />
        ))}
      </Detail>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: calc(100% - 10px * 2);
  height: 100%;
  display: flex;
  margin: 10px;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 5px #ccc;
`;

const ImgWrapper = styled.div`
  flex: 0 0 30%;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const Detail = styled.div`
  height: 100%;
  display: flex;
  flex: 0 0 70%;
  flex-direction: column;
  justify-content: space-around;
  padding: 10px;
`;

const Line = styled.p`
  margin: 3px 0;
`;
