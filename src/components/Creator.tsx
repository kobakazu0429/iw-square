import React, { FC } from "react";
import styled from "styled-components";
import { Image as CloudinaryImage, Transformation } from "cloudinary-react";

interface Props {
  // creatorId: number;
  iconPublicId: string;
  name: string;
  skills: string[];
}

export const Creator: FC<Props> = ({ iconPublicId, name, skills }) => {
  return (
    <Wrapper>
      <Avator publicId={iconPublicId}>
        <Transformation crop="fill" height="200" width="200" quality="auto" />
      </Avator>
      <Content>
        <Line>{name}</Line>
        {skills.map((skill) => (
          <Skill key={skill}>{skill}</Skill>
        ))}
      </Content>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 30px;
  width: 500px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const Avator = styled(CloudinaryImage)`
  border-radius: 50%;
  height: 120px;
`;

const Content = styled.div`
  margin-left: 10px;
`;

const Line = styled.div``;

const Skill = styled.span`
  color: rgb(239, 120, 116);
  margin: 0 5px;
  word-break: break-word;

  &::before {
    content: "#";
  }
`;
