import { createRouter } from "./context";
import { env } from "./../../env/server.mjs";
import { z } from "zod";
import { MeCabWordOutput } from "@atsumari/mecabjs";

const tokenizerApiRoute = env.SERVER_URL + "/api/tokenize";

const mecabServiceResultSchema = z.object({
  result: z.array(z.object({}).nullable()),
});

const callMecabService = async (text: string) => {
  const response = await fetch(tokenizerApiRoute, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: env.INTERNAL_SECRET,
    },
    body: JSON.stringify({ text }),
  });
  const json = await response.json();
  return json as { result: MeCabWordOutput[] };
};

export const router = createRouter().query("tokenize", {
  input: z.object({
    text: z
      .string()
      .min(1, "text must be at least 1 character")
      .max(75000, "text must be at most 75,000 characters"),
  }),
  resolve: async ({ input }) => {
    try {
      const result = await callMecabService(input.text);
      mecabServiceResultSchema.parse(result);
      return result;
    } catch (e) {
      console.error(e);
      throw e;
    }
  },
});
