import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { MainSection } from "./main-section";
import { Separator } from "@/components/ui/separator";
import { PersonalSection } from "./personal-section";
import { SignedIn } from "@clerk/nextjs";
import { SubscriptionsSection } from "./subscriptions-section";
import Link from "next/link";
import Image from "next/image";

export const HomeSidebar = () => {
  return (
    <Sidebar className="pt-16 z-40 border-none" collapsible="icon">
      <SidebarContent className="bg-background">
        <Link prefetch href="/" className="md:hidden block">
          <div className="flex items-center gap-1 p-4">
            <Image src="/logo.svg" alt="logo" width={32} height={32} />
            <p className="text-xl font-semibold tracking-tighter ">VideoTube</p>
          </div>
        </Link>
        <MainSection />
        <Separator />
        <PersonalSection />
        <SignedIn>
          <>
            <Separator />
            <SubscriptionsSection />
          </>
        </SignedIn>
      </SidebarContent>
    </Sidebar>
  );
};
