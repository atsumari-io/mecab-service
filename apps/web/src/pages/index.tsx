import { NextPage } from "next";
import React from "react";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-5xl font-bold text-center anim-1">
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
      <div className="flex space-x-3">
        <input
          type="text"
          id="text"
          className="text-gray-900 text-md rounded-md border min-w-[450px] p-2.5 bg-gray-100  placeholder-gray-500"
          placeholder="ここに入力して..."
          required
        />
        <button
          className="bg-emerald-600 rounded-md px-4 font-medium tracking-wide  \
        hover:bg-emerald-800 ease-in-out duration-200"
        >
          Submit
        </button>
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
      </div>
    </div>
  );
};

export default Home;
