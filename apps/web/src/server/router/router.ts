import { createRouter } from "./context";
import { env } from "./../../env/server.mjs";
import { z } from "zod";

const tokenizerApiRoute = env.SERVER_URL + "/api/tokenizer";

export const router = createRouter().query("tokenize", {
  input: z.object({
    text: z
      .string()
      .min(1, "text must be at least 1 character")
      .max(75000, "text must be at most 75,000 characters"),
  }),
  resolve({ input }) {
    //TODO: call the tokenizer service
  },
});
