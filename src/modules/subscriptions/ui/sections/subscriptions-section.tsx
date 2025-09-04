"use client";

import { Suspense } from "react";
import { trpc } from "@/trpc/client";
import { DEFAULT_LIMIT } from "@/constant";
import { ErrorBoundary } from "react-error-boundary";

import { InfiniteScroll } from "@/components/inifinte-scroll";

import { toast } from "sonner";
import Link from "next/link";
import {
  SubscriptionItem,
  SubscriptionItemSkeleton,
} from "../components/subscription-item";

export const SubscriptionsSection = () => {
  return (
    <Suspense fallback={<SubscriptionsSectionSkeleton />}>
      <ErrorBoundary fallback={<div>Error loading videos</div>}>
        <SubscriptionSectionSuspense />
      </ErrorBoundary>
    </Suspense>
  );
};

const SubscriptionsSectionSkeleton = () => {
  return (
    <>
      <div className="flex flex-col gap-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <SubscriptionItemSkeleton key={index} />
        ))}
      </div>
    </>
  );
};

const SubscriptionSectionSuspense = () => {
  const utils = trpc.useUtils();
  const [subscriptions, query] =
    trpc.subscriptions.getMany.useSuspenseInfiniteQuery(
      {
        limit: DEFAULT_LIMIT,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      }
    );

  const unSubscribe = trpc.subscriptions.remove.useMutation({
    onSuccess: (data) => {
      toast.success("Unsubscribed");

      utils.subscriptions.getMany.invalidate();
      utils.videos.getManySubscribed.invalidate();
      utils.users.getOne.invalidate({ id: data.creatorId });
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });
  return (
    <div>
      <div className="flex flex-col gap-4">
        {subscriptions.pages
          .flatMap((page) => page.items)
          .map((subscription) => (
            <Link
              prefetch
              href={`users/${subscription?.user?.id}`}
              key={subscription.creatorId}
            >
              <SubscriptionItem
                name={subscription?.user?.name || "User"}
                imageUrl={
                  subscription?.user?.imageUrl || "/user-placeholder.svg"
                }
                subscriberCount={subscription?.user?.subscriberCount || 0}
                isSubscribed={true}
                onUnsubscribe={() => {
                  unSubscribe.mutate({
                    userId: subscription.creatorId,
                  });
                }}
                disabled={unSubscribe.isPending}
              />
            </Link>
          ))}
      </div>
      <InfiniteScroll
        hasNextPage={query.hasNextPage}
        isFetchingNextPage={query.isFetchingNextPage}
        fetchNextPage={query.fetchNextPage}
      />
    </div>
  );
};
