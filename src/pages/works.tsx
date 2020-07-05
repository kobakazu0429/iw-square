import React from "react";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import styled from "styled-components";
import { ParsedUrlQuery } from "querystring";
import { worksClient } from "../microcms/works";
import { Work } from "../microcms/type";

import { Header } from "../layouts/Header";
import { WorkCard } from "../components/WorkCard";
// import { MobileWorkCard } from "../components/MobileWorkCard";
// import { TextField } from "../components/TextField";
// import { Tag } from "../components/Tag";
import { HeroArea } from "../components/HeroArea";

// const allTags = [
//   "レーザーカッター",
//   "Fusion360",
//   "Arduino",
//   "Raspberry Pi",
//   "3Dプリンター",
//   "C/C++",
//   "Python",
// ];

// interface WorksResponse {
//   productImage: string;
//   tags: string[];
//   title: string;
//   creator: string;
// }

// interface SearchOptions {
//   q?: string;
//   t?: string;
// }

// const queryTagNormalizer = (prevTag: string | null) =>
//   prevTag ? prevTag : undefined;
// const queryQNormalizer = (prevQ: string | null) => (prevQ ? prevQ : "");

interface ServerSideProps {
  query: ParsedUrlQuery;
  works: Work[];
}

type Props = ServerSideProps;

// eslint-disable-next-line react/display-name
export default (props: Props) => {
  // const history = useHistory();
  // const queryTag = props.query.get("tag");
  // const queryQ = props.query.get("q");

  // const { worksIndex } = useContext(AlgoliaContext);

  // const [data, setData] = useState<any[]>([]);
  // const [allTags, setAllTags] = useState<any[]>([]);
  // const [searchWord, setSearchWord] = useState<string>("");

  // const getAllTags = useCallback(() => {
  //   worksIndex.search<WorksResponse>("").then((res) => {
  //     const uniqueTags = Array.from(
  //       new Set(res.hits.map(({ tags }) => tags).flat())
  //     );
  //     setAllTags(uniqueTags);
  //   });
  // }, [worksIndex, allTags]);

  // const searchWorks = useCallback(
  //   ({ q = "", t }: SearchOptions = {}) => {
  //     const options: any = {};
  //     if (t) options.facetFilters = [`tags:${t}`];
  //     worksIndex.search<WorksResponse>(q, options).then((res) => {
  //       setData([...res.hits]);
  //       const newQuery = [];
  //       if (q !== "") newQuery.push(`q=${q}`);
  //       if (t) newQuery.push(`tag=${t}`);
  //       history.push(`/works?${newQuery.join("&")}`);
  //     });
  //   },
  //   [worksIndex]
  // );

  // init
  // useEffect(() => {
  //   getAllTags();

  //   if (queryQ) setSearchWord(queryQNormalizer(queryQ));
  //   searchWorks({
  //     q: queryQNormalizer(queryQ),
  //     t: queryTagNormalizer(queryTag),
  //   });
  // }, []);

  // useEffect(() => {
  //   searchWorks({
  //     q: queryQNormalizer(searchWord),
  //     t: queryTagNormalizer(queryTag),
  //   });
  // }, [searchWord, queryTag]);

  // const getAllWorks = useCallback(() => {
  // setSearchWord("");
  // history.push(`/works`);
  // }, []);

  return (
    <>
      <Header />
      <HeroArea text="Works" backgroundImage="images/works.jpg" />

      {/* <Controller>
        <SearchLabel>検索</SearchLabel>

        <TextField
          onChange={setSearchWord}
          value={searchWord}
          maxWidth="200px"
        />
        <Divider />
        <AllButton onClick={getAllWorks}>全件表示</AllButton>

        <Divider />
        {allTags.map((tag) => (
          <Tag tag={tag} key={tag} />
        ))}
      </Controller> */}
      <Container>
        {props.works.map(({ title, creator, tags, image_url, id }) => (
          <WorkCard
            title={title}
            publicId={image_url}
            creator={creator}
            tags={tags}
            key={id}
          />
        ))}

        {/* <MobileDesign> */}
        {/* {data.map(({ productImage, creator, tags, title }) => (
            <MobileWorkCard
              title={title}
              productImage={productImage}
              creator={creator}
              tags={tags}
              key={productImage}
            />
          ))} */}
        {/* </MobileDesign> */}
      </Container>
    </>
  );
};

export async function getServerSideProps({
  query,
}: GetServerSidePropsContext): Promise<
  GetServerSidePropsResult<ServerSideProps>
> {
  const works = await worksClient.fetchAllWorks();
  return {
    props: {
      works,
      query,
    },
  };
}

const Container = styled.div`
  width: 100%;
  padding: 50px calc((100vw - 260px * 6) / 2);
`;

// const Controller = styled.div`
//   padding: 20px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

// const SearchLabel = styled.div`
//   width: 60px;
//   margin-right: -15px;
// `;

// const Divider = styled.div`
//   width: 1px;
//   height: 20px;
//   margin: 0 20px;
//   background: ${({ theme }) => theme.color.divider};
// `;

// const AllButton = styled.button`
//   position: relative;
//   display: inline-block;
//   padding: 0.25em 0;
//   text-decoration: none;

//   &::before {
//     position: absolute;
//     content: "";
//     width: 100%;
//     height: 1px;
//     top: 100%;
//     left: 0;
//     background: ${({ theme }) => theme.color.text.primary};
//   }
// `;
