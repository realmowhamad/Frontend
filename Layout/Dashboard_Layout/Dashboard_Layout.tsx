import TopNavbar from "@/components/(Dashboard Components)/Navbar_Dashboard/Navbar_Dashboard";
import Sidebar from "@/components/(Dashboard Components)/Sidebar/Sidebar";
import React, { ReactNode } from "react";
import useGetMyDetails from '@/hooks/useAuth/useAuth'
import UseAuth from "@/hooks/useAuth/useAuth";
import Unauthorized_Component from "@/components/(UI_Components)/Unauthorized_Component";
import dynamic from "next/dynamic";
import { useModal } from "@/context/ModalContext/ModalContext";
import ReservationModal from "@/components/(Dashboard Components)/ReservationModal/ReservationModal";

const LazyLoginComponent = dynamic(
  () => import("@/components/(Auth Components)/Login-component/LoginComponent"),
  { ssr: false }
);
const LazyReservationComponent = dynamic(
  () => import("@/components/(Dashboard Components)/ReservationModal/ReservationModal"),
  { ssr: false }
);
const LazyRegisterComponent = dynamic(
  () =>
    import(
      "@/components/(Auth Components)/Register-component/RegisterComponent"
    ),
  { ssr: false }
);
function DashboardLayout({ children }: { children: ReactNode }) {
  const { modalType, openModalHandler, closeModalHandler, showModal } = useModal()

  const formSwitcher = () => {
    switch (modalType) {
      case "RESERVATION":
        return <ReservationModal />;
      case "REGISTER":
        return <LazyRegisterComponent />;
      case "RECOVERY":
      // return <LazyRecoveryComponent changeModal={openModal} closeModal={closeModal} />;
      default:
        return <p>No form to display.</p>;
    }
  };

  const { myDetailsData } = UseAuth().useGetMyDetails()
  if (!myDetailsData) return <Unauthorized_Component />
  return (
    <div className="bg-white w-screen h-screen overflow-hidden lg:flex lg:flex-row">
      {showModal && formSwitcher()}

      <Sidebar />
      <div className="w-full h-full overflow-hidden flex flex-col flex-[1_0_70%] ">
        <TopNavbar />
        {children}
      </div>
    </div>
  );
}

export default DashboardLayout;
