import Banner from "@/components/home/banner";
import { Suspense } from "react";

const BannerLoading = () => {
  return <div className="h-[440px] bg-muted sm:h-[470px] lg:h-[500px]" />;
};

export default function Home() {
  return (
    <main>
      <Suspense fallback={<BannerLoading />}>
        <Banner />
      </Suspense>
    </main>
  );
}
