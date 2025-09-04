import { AppRouter } from "@/trpc/routers/_app";
import { inferRouterOutputs } from "@trpc/server";

export type PlaylistGetManyOutPut =
  inferRouterOutputs<AppRouter>["playlists"]["getMany"];
