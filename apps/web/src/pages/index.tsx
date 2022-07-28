import { NextPage } from "next";
import React from "react";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const { data } = trpc.useQuery([".tokenize", { text: "それがよかったね。" }]);
  return <div>{}</div>;
};

export default Home;
