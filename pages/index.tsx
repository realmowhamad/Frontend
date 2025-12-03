import MainpageLayout from "@/Layout/MainpageLayout/MainpageLayout";
import dynamic from "next/dynamic";
import { Suspense } from "react";


const Herosection = dynamic(() => import("@/components/(UI_Components)/HeroSection/HeroSection"), { ssr: true })
const Reservation = dynamic(() => import("@/components/(Elements)/Reservation/Reservation"), { ssr: true })
const ReviewSlider = dynamic(() => import("@/components/(Elements)/Reviews/Reviews"), { ssr: true })
const MenuPreview = dynamic(() => import("@/components/(Elements)/MenuPreview/MenuPreview"), { ssr: true })
const Restaurant_Offers = dynamic(() => import("@/components/(Elements)/Restaurant_Offers/Restaurant_Offers"), { ssr: true })

export default function Home() {


  return (
    <MainpageLayout>
      <Herosection />
      <Suspense>
        <MenuPreview />
        <Reservation />
        <Restaurant_Offers />
        <ReviewSlider />
      </Suspense>
    </MainpageLayout>
  );
}
