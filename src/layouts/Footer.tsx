import React, { FC } from "react";
import styled from "styled-components";

const FOOTER_HEIGHT = 60;

export const Footer: FC = () => (
  <FooterStyle>
    <span>
      &copy; 2020 - <a href="https://twitter.com/kobakazu0429">kobakazu0429</a>
    </span>
  </FooterStyle>
);

const FooterStyle = styled.footer`
  width: 100%;
  height: ${FOOTER_HEIGHT}px;
  line-height: ${FOOTER_HEIGHT}px;
  vertical-align: middle;
  text-align: center;
  background-color: rgba(45, 55, 72, 1);
  * {
    color: white;
  }
`;
