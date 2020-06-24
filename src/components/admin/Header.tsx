import React, { FC } from "react";
import Link from "next/link";
import { Container, Menu } from "semantic-ui-react";

export const AdminHeader: FC = () => {
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Link href="/admin">
          <Menu.Item as="a" header>
            呉高専 IWスクエア 管理ページ
          </Menu.Item>
        </Link>
        <Link href="/admin/works">
          <Menu.Item as="a">Works</Menu.Item>
        </Link>
        <Link href="/admin/creators">
          <Menu.Item as="a">Creators</Menu.Item>
        </Link>
        <Link href="/admin/tags">
          <Menu.Item as="a">Tags</Menu.Item>
        </Link>
      </Container>
    </Menu>
  );
};
