import { NextPage } from "next";
import React from "react";
import { inferQueryOutput, trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const [text, setText] = React.useState<string>("");

  const { refetch, isFetching, data } = trpc.useQuery([".tokenize", { text }], {
    enabled: false, // disable automatic queries
  });

  const onSubmit = async (text: string) => {
    await refetch();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-5xl max-w-[615px] font-bold text-center anim-1">
        Japanese Text Segmenter
      </h1>
      <div className="pt-2 md:pt-2" />
      <h2 className="text-xl font-normal text-center anim-1">
        Powered by{" "}
        <span className="text-emerald-400 hover:cursor-pointer font-bold">
          <a
            href="https://taku910.github.io/mecab/"
            rel="noreferrer"
            target="_blank"
          >
            MeCab
          </a>
        </span>
      </h2>
      <div className="pt-12 md:pt-6" />
      <div>
        <p className="text-lg font-normal anim-1 text-zinc-400 text-left">
          Enter some Japanese text below:
        </p>
        <div className="pt-1 md:pt-1" />
        <div className="flex space-x-3">
          <input
            type="text"
            id="text"
            className="anim-1 text-gray-900 text-md rounded-md border md:min-w-[515px] \
                p-2.5 bg-zinc-100  placeholder-zinc-500"
            placeholder="ここに入力して..."
            onChange={(e) => setText(e.target.value)}
            required
          />
          <button
            className=" anim-1 bg-emerald-600 rounded-md px-4 font-medium tracking-wide  \
              hover:bg-emerald-800 ease-in-out duration-200"
            onClick={() => onSubmit(text)}
          >
            Submit
          </button>
        </div>
      </div>
      <div className="mt-4" />
      <div className="flex gap-4 font-medium anim-2">
        <a
          href="https://github.com/atsumari-io/mecab-service"
          rel="noreferrer"
          target="_blank"
          className="px-3 py-1 transition-all duration-200 rounded-md hover:bg-emerald-800"
        >
          GitHub
        </a>
        <a
          href="https://taku910.github.io/mecab/"
          rel="noreferrer"
          target="_blank"
          className="px-3 py-1 transition-all duration-200 rounded-md hover:bg-emerald-800"
        >
          MeCab
        </a>
      </div>
    </div>
  );
};

export default Home;
