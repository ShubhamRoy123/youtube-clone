import { DEFAULT_LIMIT } from "@/constant";
import { trpc } from "@/trpc/client";
import { CornerDownRightIcon, Loader2Icon } from "lucide-react";
import { CommentItem } from "./comment-item";
import { Button } from "@/components/ui/button";

interface CommentRepliesProps {
  parentId: string;
  videoId: string;
}
export const CommentReplies = ({ parentId, videoId }: CommentRepliesProps) => {
  const { 
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
 } = trpc.comments.getMany.useInfiniteQuery(
    {
      limit: DEFAULT_LIMIT,
      videoId,
      parentId,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  return (
    <div className="pl-14  ">
      <div className="flex flex-col gap-4 mt-2">
        {isLoading && (
          <div className="flex items-center justify-center">
            <Loader2Icon className="size-6 text-muted-foreground animate-spin" />
          </div>
        )}
        {!isLoading &&
          data?.pages
            .flatMap((page) => page.items)
            .map((comment) => (
              <CommentItem key={comment.id} comment={comment} variant="reply" />
            ))}
      </div>
      {
        hasNextPage && (
            <Button
            type="button"
            variant="tertiary"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            >
                <CornerDownRightIcon/>
              Show more replies
            </Button>
        )

      }
    </div>
  );
};
