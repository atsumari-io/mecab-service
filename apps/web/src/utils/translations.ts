import { MeCabWordOutput } from "@atsumari/mecabjs";

export const Lexicals: {
  [key: string]: string;
} = {
  名詞: "NOUN",
  動詞: "VERB",
  記号: "PUNCTUATION",
  助詞: "PARTICLE",
  形容詞: "I_ADJECTIVE",
  助動詞: "AUXILLARY_VERB",
  副詞: "ADVERB",
  接続詞: "CONJUNCTION",
  連体詞: "PRE_NOUN_ADJECTIVE",
};

export const Compounds: {
  [key: string]: string;
} = {
  自立: "INDEPENDENT",
  非自立: "NOT_INDEPENDENT",
  格助詞: "CASE_MARK_PARTICLE",
  係助詞: "CONNECTING_PARTICLE",
  代名詞: "PRONOUN",
  接続助詞: "CONJUNCTION_PARTICLE",
  一般: "GENERAL",
  形容動詞語幹: "NA_ADJECTIVE",
  終助詞: "END_PARTICLE",
  句点: "FULL_STOP",
};

export const Inflections: {
  [key: string]: string;
} = {
  連用形: "STEM",
  基本形: "DICTIONARY",
  未然形: "NAI_STEM_VERB",
  連用テ接続: "TE_STEM",
  連用タ接続: "TA_STEM",
  仮定形: "HYPOTHETICAL_FORM",
  未然ウ接続: "VOLITIONAL_STEM",
};

export const translateMecabWordOutput = (
  word: MeCabWordOutput | null
): MeCabWordOutput | null => {
  if (!word) {
    return null;
  }
  const { lexical, compound1, compound2, compound3, inflection } = word;

  return {
    ...word,
    lexical:
      lexical && lexical in Lexicals ? Lexicals[lexical] ?? null : lexical,
    compound1:
      compound1 && compound1 in Compounds
        ? Compounds[compound1] ?? null
        : compound1,
    compound2:
      compound2 && compound2 in Compounds
        ? Compounds[compound2] ?? null
        : compound2,
    compound3:
      compound3 && compound3 in Compounds
        ? Compounds[compound3] ?? null
        : compound3,
    inflection:
      inflection && inflection in Inflections
        ? Inflections[inflection] ?? null
        : inflection,
  };
};
