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

export const WorkCard: FC<Props> = ({ productImage, title, creator, tags }) => {
  return (
    <Wrapper>
      <Img src={productImage}></Img>
      <Content>
        <CreatorName>{title}</CreatorName>
        <br />
        <CreatorName>{creator}</CreatorName>
        <br />
        {tags.map((tag) => (
          <Tag tag={tag} key={tag} />
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

const Img = styled.img`
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
