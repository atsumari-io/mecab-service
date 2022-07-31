import { MeCabWordOutput } from "@atsumari/mecabjs";
import {
  Drawer,
  DrawerProps,
  DrawerContent,
  DrawerOverlay,
  DrawerBody,
  DrawerCloseButton,
  Box,
} from "@chakra-ui/react";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";

type Mapping = null | {
  text: string;
  mecabData: MeCabWordOutput | null;
  id: string;
};

interface SelectedWordContextType {
  word: Mapping;
  setWord: Dispatch<SetStateAction<Mapping>>;
}

const SelectedWordContext = createContext<SelectedWordContextType>({
  word: null,
  setWord: () => {},
});

const Word: React.FC<{
  text: string;
  mecabData: MeCabWordOutput | null;
  id: string;
}> = ({ text, mecabData, id }) => {
  const { setWord, word } = useContext(SelectedWordContext);
  return (
    <div
      className={`hover:bg-rose-600 cursor-pointer
      inline-block text-2xl ease-in-out duration-200 rounded-md p-[1px] mb-1 mr-[1px] ${
        word?.id === id ? "bg-rose-600" : ""
      }`}
      onClick={() => setWord({ text, mecabData, id })}
    >
      <span>{text}</span>
    </div>
  );
};

const SelectedWordDataContainer: React.FC<{}> = () => {
  const { word } = useContext(SelectedWordContext);
  let compound = "";
  if (word?.mecabData) {
    compound += (word.mecabData.compound1 ?? "") + " ";
    compound += (word.mecabData.compound2 ?? "") + " ";
    compound += (word.mecabData.compound3 ?? "") + " ";
  }
  return (
    <div>
      {word === null && (
        <div className="text-2xl">Select a text segment from above.</div>
      )}
      {word !== null && word.mecabData === null && (
        <div className="text-2xl">
          No applicable information for this segment.
        </div>
      )}
      {word !== null && word.mecabData !== null && (
        <table className="text-xl w-full border-separate border-spacing-3 table-fixed">
          <tbody>
            <tr>
              <td className="text-xl">Selected Word</td>
              <td>{word.mecabData.original}</td>
            </tr>
            <tr>
              <td className="text-xl">Pronunciation</td>
              <td>{word.mecabData.pronunciation ?? "N/A"}</td>
            </tr>
            <tr>
              <td className="text-xl">Reading</td>
              <td>{word.mecabData.reading ?? "N/A"}</td>
            </tr>
            <tr>
              <td className="text-xl">Lexical</td>
              <td>{word.mecabData.lexical ?? "N/A"}</td>
            </tr>
            <tr>
              <td className="text-xl">Compound</td>
              <td>{compound}</td>
            </tr>
            <tr>
              <td className="text-xl">Conjugation</td>
              <td>{word.mecabData.conjugation ?? "N/A"}</td>
            </tr>
            <tr>
              <td className="text-xl">Inflection</td>
              <td>{word.mecabData.inflection ?? "N/A"}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

/**
 * We need to know what parts of the texts have a `null` MeCab output.
 * e.g. "asd こんにちは" will have a null output then regular output but still needs to be mapped
 * in order to display in the UI and keep the order.
 */
const matchTextPartToMecabData = (
  text: string,
  mecabData: (MeCabWordOutput | null)[]
) => {
  let cursor = 0;
  let mappings: { text: string; mecabData: MeCabWordOutput | null }[] = [];
  for (let data of mecabData) {
    if (data === null || data.kanji === null) continue;
    const word = data.kanji;
    const index = text.indexOf(word, cursor);
    if (cursor !== index) {
      // handle a null word prior.
      mappings.push({
        text: text.substring(cursor, index),
        mecabData: null,
      });
    }
    mappings.push({ text: word, mecabData: data });
    // update cursor
    cursor = index + word.length;
  }

  // push any text left over e.g. handle "こんにちはasd"
  if (cursor < text.length) {
    mappings.push({ text: text.substring(cursor), mecabData: null });
  }

  return mappings;
};

export const OutputDrawer = (
  props: Pick<DrawerProps, "onClose" | "isOpen"> & {
    text: string;
    mecabData: (MeCabWordOutput | null)[];
  }
) => {
  const [word, setWord] = useState<Mapping>(null);
  const value = useMemo(() => ({ word, setWord }), [word]);

  const { mecabData, text } = props;
  const mappings = matchTextPartToMecabData(text, mecabData);
  return (
    <Drawer {...props} placement="left" size={"lg"}>
      <DrawerOverlay />
      <DrawerContent
        className=" bg-zinc-900 text-gray-100"
        bg={"bg-zinc-900"}
        textColor={"text-gray-100"}
      >
        <DrawerBody px={0} pt={16} pb={0}>
          <DrawerCloseButton />
          <div className="flex flex-col justify-between h-full">
            <SelectedWordContext.Provider value={value}>
              <Box
                className="mx-5 px-8 py-6 rounded-lg min-h-[200px] max-h-[800px] overflow-y-auto bg-black shadow-inner"
                css={{
                  "&::-webkit-scrollbar": {
                    width: "10px",
                    height: "10px",
                  },
                  "&::-webkit-scrollbar-track": {
                    width: "10px",
                    height: "10px",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    background: "#27272a",
                  },
                }}
              >
                {mappings.map((m, i) => (
                  <Word
                    key={m.text + i}
                    text={m.text}
                    mecabData={m.mecabData}
                    id={m.text + i}
                  />
                ))}
              </Box>
              <div className="px-10 py-10 flex-grow text-lg shadow-inner bg-zinc-900">
                <SelectedWordDataContainer />
              </div>
            </SelectedWordContext.Provider>
          </div>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
