import { SubscriptionsSection } from "../ui/sections/subscriptions-section";



export const SubscriptionsView = () => {
  return (
    <div className="max-w-[2400px] mx-auto mb-10 px-4 pt-1.5 flex flex-col gap-y-6">
      <div>
        <h1 className="text-2xl font-bold">All subscriptions</h1>
        <p className="text-xm text-muted-foreground">
          View and manage all your subscriptions
        </p>
      </div>

      <SubscriptionsSection />
    </div>
  );
};



