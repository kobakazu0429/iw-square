import React from "react";
import styled from "styled-components";
import { createCloudinaryUrl } from "../cloudinary/util";
import { PublicPageTemplate } from "../layouts/PublicPageTemplate";

// eslint-disable-next-line react/display-name
export default () => {
  return (
    <PublicPageTemplate pageTitle="インキュベーションスクエア">
      <Container>
        <HeroArea>
          <HeroImg
            src={createCloudinaryUrl({
              publicId: "safe-is-first_tcgr8w",
            })}
            alt="私たちは安全を第一に考えています！"
          />
        </HeroArea>
      </Container>
    </PublicPageTemplate>
  );
};

const Container = styled.div`
  width: 100%;
`;

const HeroArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HeroImg = styled.img`
  width: 100%;
`;
