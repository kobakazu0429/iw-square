import React, { FC } from "react";
import Link from "next/link";
import styled from "styled-components";
import { createCloudinaryUrl } from "../cloudinary/util";
// import { BarsIcon } from "../icons/Bars";
const routes = [
  {
    path: "/",
    name: "Top",
  },
  {
    path: "/works",
    name: "Works",
  },
  {
    path: "/creators",
    name: "Creators",
  },
];

const Links: FC = () => (
  <>
    {routes.map(({ name, path }) => (
      <LinkWrapper key={`nav${path}`}>
        <Link href={path}>
          <PageLink>{name}</PageLink>
        </Link>
      </LinkWrapper>
    ))}
  </>
);

const HEADER_HEIGHT = 60;

export const Header = () => (
  <HeaderStyle>
    <Link href="/">
      <LogoArea>
        <Logo
          src={createCloudinaryUrl({
            height: HEADER_HEIGHT,
            publicId: "logo_iwicqa",
          })}
          alt="ロゴ画像"
        />
        <BrandText>呉高専IWスクエア</BrandText>
      </LogoArea>
    </Link>
    <PCNav>
      <Links />
    </PCNav>
  </HeaderStyle>
);

const HeaderStyle = styled.header`
  width: 100%;
  height: ${HEADER_HEIGHT}px;
  line-height: ${HEADER_HEIGHT}px;
  vertical-align: middle;
  display: flex;
  flex-shrink: 0;
  border-bottom: 1px solid ${({ theme }) => theme.color.divider};
`;

const LogoArea = styled.a`
  display: flex;
  width: auto;
  margin-right: auto;
  cursor: pointer;
`;

const Logo = styled.img`
  height: ${HEADER_HEIGHT - 1}px;
  width: ${HEADER_HEIGHT - 1}px;
`;

const BrandText = styled.div`
  color: ${({ theme }) => theme.color.text.primary};
  font-size: 1.5rem;
  text-align: left;
  vertical-align: middle;
  margin-left: 15px;
  @media only screen and (max-width: 480px) {
    display: none;
  }
`;

const PCNav = styled.nav`
  padding: 0 30px;
  display: flex;
  font-size: 18px;
`;

const LinkWrapper = styled.div`
  padding: 0 10px;
`;

const PageLink = styled.a`
  &:visited {
    color: ${({ theme }) => theme.color.text.primary};
  }
  &:hover {
    color: ${({ theme }) => theme.color.text.primary};
  }
  &::after {
    position: absolute;
    border-bottom: solid 2px ${({ theme }) => theme.color.text.primary};
    bottom: 15px;
    content: "";
    display: block;
    transition: all 0.3s ease;
    -webkit-transition: all 0.3s ease;
    width: 0;
  }
  &:hover::after {
    width: 100%;
  }
  position: relative;
  display: block;
  text-decoration: none;
  cursor: pointer;
  color: ${({ theme }) => theme.color.text.primary};
`;
