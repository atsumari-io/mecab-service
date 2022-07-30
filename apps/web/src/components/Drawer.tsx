import { MeCabWordOutput } from "@atsumari/mecabjs";
import {
  Drawer,
  DrawerProps,
  DrawerContent,
  DrawerOverlay,
  DrawerBody,
  DrawerCloseButton,
} from "@chakra-ui/react";

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
  const { mecabData, text } = props;
  console.log(matchTextPartToMecabData(text, mecabData));
  return (
    <Drawer {...props} placement="left" size={"xl"}>
      <DrawerOverlay />
      <DrawerContent
        className="p-10 bg-zinc-900 text-gray-100"
        bg={"bg-zinc-900"}
        textColor={"text-gray-100"}
      >
        <DrawerCloseButton />
        <DrawerBody>
          <div>{}</div>
          <div></div>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
