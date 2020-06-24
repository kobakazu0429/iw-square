import React from "react";
import styled from "styled-components";
import { Header } from "../layouts/Header";
import { Creator } from "../components/Creator";
import { HeroArea } from "../components/HeroArea";

interface CreatorsResponse {
  avatorUrl: string;
  name: string;
  skills: string[];
  objectID: string;
}

const data: CreatorsResponse[] = [
  {
    avatorUrl:
      "https://drive.google.com/uc?export=view&id=14TI2lGKIQK87yQL2rcPvuDYRQ465tdSH",
    skills: ["Arduino", "C/C++"],
    name: "高専太郎",
    objectID: "5063178001",
  },
  {
    avatorUrl:
      "https://drive.google.com/uc?export=view&id=1Qxe47WpjwKikgw_HSavBzbb1OYO0evi1",
    skills: ["レーザーカッター", "3Dプリンター", "Fusion360"],
    name: "小畠 一泰",
    objectID: "50631771",
  },
];

// eslint-disable-next-line react/display-name
export default () => {
  return (
    <>
      <Header />
      <HeroArea text="Creators" backgroundImage="images/creators.jpg" />
      <Container>
        {data.map(({ avatorUrl, name, skills }) => (
          <Creator
            avatorUrl={avatorUrl}
            name={name}
            skills={skills}
            key={name}
          />
        ))}
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 100%;
  height: auto;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`;
