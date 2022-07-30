import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="text-gray-100 bg-zinc-900">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
