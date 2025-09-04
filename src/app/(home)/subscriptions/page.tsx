import { DEFAULT_LIMIT } from "@/constant";
import { SubscriptionsView } from "@/modules/subscriptions/views/subscriptions-view";
import { HydrateClient, trpc } from "@/trpc/server";

const page = async () => {
  void trpc.subscriptions.getMany.prefetchInfinite({
    limit: DEFAULT_LIMIT,
  });
  return (
    <HydrateClient>
      <SubscriptionsView />
    </HydrateClient>
  );
};

export default page;
