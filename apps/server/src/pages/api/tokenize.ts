import { NextApiRequest, NextApiResponse } from "next";
import { MeCab } from "@atsumari/mecabjs";

export default async function tokenize(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end("Method not allowed");
  }

  if (req.headers["content-type"] !== "application/json") {
    return res.status(415).end("Content-Type must be application/json");
  }

  const { text } = req.body;
  if (!text) {
    res.status(400).json({ error: "text is required" });
  }

  const mecabResult = await new MeCab().parse(text);

  return res.status(200).json({ result: mecabResult });
}
