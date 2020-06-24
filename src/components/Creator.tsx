import React, { FC } from "react";
import styled from "styled-components";

interface Props {
  // creatorId: number;
  avatorUrl: string;
  name: string;
  skills: string[];
}

export const Creator: FC<Props> = ({ avatorUrl, name, skills }) => {
  return (
    <Wrapper>
      <Avator src={avatorUrl} />
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

const Avator = styled.img`
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
