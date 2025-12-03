import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import { ModalProvider } from "../ModalContext/ModalContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PrimeReactProvider } from "primereact/api";
import Tailwind from "primereact/passthrough/tailwind";
// import { SnackbarProvider } from "notistack";
// import { ModalProvider } from "../ModalContext/ModalContext";




const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          mutations: {},
          queries: {
            refetchOnWindowFocus: false,
            refetchInterval: false,
            refetchOnMount: false,
            refetchIntervalInBackground: false,
            refetchOnReconnect: false,
            staleTime: 2 * 60 * 60 * 1000,

          },
        },
      })
  );


  return (
    // <ModalProvider>
    <QueryClientProvider client={queryClient}>
      <ToastContainer
        theme="colored"
        newestOnTop={true}
        closeOnClick={true}
        limit={3}
        position="top-right"
        autoClose={3000}
      />
      <PrimeReactProvider value={{ pt: Tailwind }}>
        <ModalProvider>
          {children}
        </ModalProvider>
        <ReactQueryDevtools />
      </PrimeReactProvider>
    </QueryClientProvider>
    // </ModalProvider>
  );
};

export default AppProvider;
