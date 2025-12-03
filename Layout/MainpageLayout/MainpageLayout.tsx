// components/MainpageLayout.tsx
import Footer from "@/components/(Elements)/Footer/Footer";
import HeadBar from "@/components/(Elements)/Headbar/HeadBar";
import BottomBar from "@/components/(UI_Components)/BottomBar/BottomBar";
import { useModal } from "@/context/ModalContext/ModalContext";
import dynamic from "next/dynamic";
import Head from "next/head";
import { ReactNode, useEffect, useState } from "react";

// Dynamic imports for the modal components with no SSR (since they're modals)
const LazyLoginComponent = dynamic(
  () => import("@/components/(Auth Components)/Login-component/LoginComponent"),
  { ssr: false }
);
const LazyRegisterComponent = dynamic(
  () =>
    import(
      "@/components/(Auth Components)/Register-component/RegisterComponent"
    ),
  { ssr: false }
);

const Navbar = dynamic(() => import("@/components/(Elements)/Navbar/Navbar"), {
  ssr: false,
});

function MainpageLayout({ children }: { children: ReactNode }) {
  const { modalType, openModalHandler, closeModalHandler, showModal } = useModal()
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsClient(true);
    }, 400);
  }, []);

  const formSwitcher = () => {
    switch (modalType) {
      case "LOGIN":
        return <LazyLoginComponent />;
      case "REGISTER":
        return <LazyRegisterComponent />;
      case "RECOVERY":
      // return <LazyRecoveryComponent changeModal={openModal} closeModal={closeModal} />;
      default:
        return <p>No form to display.</p>;
    }
  };



  if (!isClient) {
    return (
      <div className="flex justify-center w-full">
        <p style={{ left: 80, top: 40 }} className="relative ">
          Loading{" "}
        </p>
        <span className=" loader " />
      </div>
    );
  }

  return (
    <>
    <Head>
      <title>Perisan Riverside</title>
      <meta name="description" content="Perisan Riverside Restaurant" />
      <link rel="icon" href="/icons/prs.ico" />
      <meta name="keywords" content="Restaurant, Halal Food, Halal, Kingston, Kingston Restaurant, Restaurant in Kingston" />

      {/* Add additional meta tags here */}

    </Head>
    <div className="parentLayout overflow-x-hidden">
      {showModal && formSwitcher()}
      <HeadBar />
      
      {/* Ensure Navbar has the correct handler to open the modal */}
      <Navbar />

      <div className="min-h-screen h-auto" >
        {children}
      </div>
      <BottomBar />
      <Footer />
    </div>
    </>
  );
}

export default MainpageLayout;
