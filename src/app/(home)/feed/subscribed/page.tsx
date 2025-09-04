// "use client";

import { DEFAULT_LIMIT } from "@/constant";
import { SubscribedView } from "@/modules/home/ui/views/subscribed-view";
import { HydrateClient, trpc } from "@/trpc/server";

export const dynamic = "force-dynamic";

const Page = async () => {
  void trpc.videos.getManySubscribed.prefetchInfinite({
    limit: DEFAULT_LIMIT,
  });
  return (
    <div>
      <HydrateClient>
        <SubscribedView />
      </HydrateClient>
    </div>
  );
};

export default Page;
