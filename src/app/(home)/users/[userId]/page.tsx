import { DEFAULT_LIMIT } from "@/constant";
import { UserView } from "@/modules/users/views/user-view";
import { HydrateClient, trpc } from "@/trpc/server";

interface PageProps {
  params: Promise<{
    userId: string;
  }>;
}

const page = async ({ params }: PageProps) => {
  const { userId } = await params;

  void trpc.users.getOne.prefetch({ id: userId });
  void trpc.videos.getMany.prefetchInfinite({
    userId,
    limit: DEFAULT_LIMIT,
  });


  return (
    <HydrateClient>
      <UserView userId={userId} />
    </HydrateClient>
  );
};

export default page;
