// context/ModalContext.tsx
import { createContext, useState, ReactNode, useContext } from "react";

export type ModalType = "LOGIN" | "REGISTER" | "RECOVERY" | "CHECKOUT" | "RESERVATION" | null;

interface ModalContextProps {
    modalType: ModalType;
    showModal: boolean;
    openModalHandler: (type: ModalType) => void;
    closeModalHandler: () => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [modalType, setModalType] = useState<ModalType>(null);
    const [showModal, setShowModal] = useState(false);


    const openModalHandler = (type: ModalType) => {
        setModalType(type);
        setShowModal(true);
    };

    const closeModalHandler = () => {
        setModalType(null);
        setShowModal(false);
    };

    return (
        <ModalContext.Provider value={{ modalType, showModal, openModalHandler, closeModalHandler }}>
            {children}
        </ModalContext.Provider>
    );
};

// Custom hook to use the ModalContext
export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error("useModal must be used within a ModalProvider");
    }
    return context;
};
