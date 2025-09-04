import { cn } from "@/lib/utils";
import { UserGetOneOutput } from "../../types";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Edit2Icon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { BannerUploadModal } from "./banner-upload-modal";
import { useState } from "react";

interface UserPagebannerProps {
  user: UserGetOneOutput;
}

export const UserPageBannerSkeleton = () => {
  return <Skeleton className="w-full max-h-[200px] h-[15vh] md:h-[25vh] " />;
};

export const UserPageBanner = ({ user }: UserPagebannerProps) => {
  const { userId } = useAuth();
  const [isBannerModelOpen, setIsBannerModelOpen] = useState(false);
  return (
    <div className="relative group">
      <BannerUploadModal
        open={isBannerModelOpen}
        onOpenChange={setIsBannerModelOpen}
        userId={user.id}
      />
      <div
        className={cn(
          "rounded-xl w-full max-h-[200px] h-[15vh] md:h-[25vh] bg-gradient-to-r from-gray-100 to-gray-200",
          user.bannerUrl ? "bg-cover bg-center" : "bg-gray-100"
        )}
        style={{
          backgroundImage: user.bannerUrl
            ? `url(${user.bannerUrl})`
            : "undefined",
        }}
      >
        {user.clerkId === userId && (
          <Button
            type="button"
            // variant="outline"
            size="icon"
            className="absolute top-4 right-4 rounded-full bg-black/50 hover:bg-black/50 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            onClick={() => setIsBannerModelOpen(true)}
          >
            <Edit2Icon className="size-4 text-white" />
          </Button>
        )}
      </div>
    </div>
  );
};
