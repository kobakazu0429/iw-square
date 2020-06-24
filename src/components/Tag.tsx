import React, { FC } from "react";
import styled from "styled-components";
import Link from "next/link";

interface Props {
  tag: string;
}

export const Tag: FC<Props> = ({ tag }) => {
  return (
    <Link href={`/works?tag=${tag}`}>
      <StyledTag>{tag}</StyledTag>
    </Link>
  );
};

const StyledTag = styled.a`
  color: rgb(61, 118, 153);
  margin: 0 5px;
  word-break: break-word;

  &::before {
    content: "#";
  }
`;
