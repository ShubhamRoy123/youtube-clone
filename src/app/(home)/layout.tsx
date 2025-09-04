import { HomeLayout } from "@/modules/home/ui/layouts/home-layout";

interface HomeLayoutProps {
  children: React.ReactNode;
}

const homeLayout = ({ children }: HomeLayoutProps) => {
  return <HomeLayout>{children}</HomeLayout>;
};

export default homeLayout;