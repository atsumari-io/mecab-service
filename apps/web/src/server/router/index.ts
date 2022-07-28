// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { router } from "./router";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge(".", router);

// export type definition of API
export type AppRouter = typeof appRouter;
