import { DEFAULT_LIMIT } from "@/constant";
import { PlaylistView } from "@/modules/playlists/ui/views/playlist-view";
import { HydrateClient, trpc } from "@/trpc/server";

export const dynamic = "force-dynamic";


const page = () => {
  void trpc.playlists.getMany.prefetchInfinite({
    limit: DEFAULT_LIMIT,
  });
  return (
    <HydrateClient>
      <PlaylistView />
    </HydrateClient>
  );
};

export default page;
