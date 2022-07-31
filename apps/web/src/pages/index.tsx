import { NextPage } from "next";
import React from "react";
import { trpc } from "../utils/trpc";
import { useDisclosure, Button } from "@chakra-ui/react";
import { OutputDrawer } from "../components/Drawer";
import Head from "next/head";

const Home: NextPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [text, setText] = React.useState<string>("");

  const { mutate, data, isLoading } = trpc.useMutation(".tokenize");

  const onSubmit = async (text: string) => {
    await mutate({ text });
    onOpen();
  };

  return (
    <>
      <Head>
        <title>Japanese Text Segmenter</title>
      </Head>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-5xl max-w-[615px] font-bold text-center anim-1">
          Japanese Text Segmenter
        </h1>
        <div className="pt-2 md:pt-2" />
        <h2 className="text-xl font-normal text-center anim-1">
          Powered by{" "}
          <span className="text-rose-400 hover:cursor-pointer font-bold">
            <a
              href="https://taku910.github.io/mecab/"
              rel="noreferrer"
              target="_blank"
            >
              MeCab
            </a>
          </span>
          {" + "}
          <span className="text-violet-300 hover:cursor-pointer font-bold">
            <a href="https://create.t3.gg/" rel="noreferrer" target="_blank">
              T3
            </a>
          </span>
          {" + "}
          <span className="text-[#853bce] hover:cursor-pointer font-bold">
            <a href="https://railway.app/" rel="noreferrer" target="_blank">
              Railway
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
            <Button
              className="anim-1 bg-rose-600 rounded-md px-4 font-medium tracking-wide  \
              hover:bg-rose-800 ease-in-out duration-200"
              onClick={async () => await onSubmit(text)}
              isLoading={isLoading}
              bg="bg-rose-600"
              _hover={{ bg: "bg-rose-800" }}
              size="lg"
            >
              Submit
            </Button>
          </div>
        </div>
        <div className="mt-4" />
        <div className="flex gap-4 font-medium anim-2">
          <a
            href="https://github.com/atsumari-io/mecab-service"
            rel="noreferrer"
            target="_blank"
            className="px-3 py-1 transition-all duration-200 rounded-md hover:bg-zinc-800"
          >
            GitHub
          </a>
          <a
            href="https://twitter.com/nickramki"
            rel="noreferrer"
            target="_blank"
            className="px-3 py-1 transition-all duration-200 rounded-md hover:bg-zinc-800"
          >
            Twitter
          </a>
        </div>
      </div>
      {data && (
        <OutputDrawer
          isOpen={isOpen}
          onClose={onClose}
          text={text}
          mecabData={data.result}
        />
      )}
    </>
  );
};

export default Home;
