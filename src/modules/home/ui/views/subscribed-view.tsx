import { SubscribedVideosSection } from "../sections/subscribed-videos-section";

export const SubscribedView = () => {
  return (
    <div className="max-w-[2400px] mx-auto mb-10 px-4 pt-1.5 flex flex-col gap-y-6">
      <div>
        <h1 className="text-2xl font-bold">Subscribed</h1>
        <p className="text-xm text-muted-foreground">
          Videos from channels you are subscribed
        </p>
      </div>

      <SubscribedVideosSection />
    </div>
  );
};
