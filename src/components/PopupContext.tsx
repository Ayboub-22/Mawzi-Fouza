// PopupContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

interface PopupContextType {
  isPopupVisible: boolean;
  isPopup1Visible: boolean;
  isMember: boolean;
  changeStatus1: () => void;
  changeStatus2: () => void;
  togglePopup: () => void;
  closePopup: () => void;
  togglePopup1: () => void;
  closePopup1: () => void;
}

const PopupContext = createContext<PopupContextType | undefined>(undefined);

export const PopupProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isPopup1Visible, setIsPopup1Visible] = useState(false);
  const [isMember, setIsMember] = useState(true);

  const changeStatus1 = () => {
    setIsMember(true);
  };
  const changeStatus2 = () => {
    setIsMember(false);
  };

  const togglePopup = () => {
    setIsPopupVisible(true);
  };

  const closePopup = () => {
    setIsPopupVisible(false);
  };
  const togglePopup1 = () => {
    setIsPopup1Visible(true);
  };

  const closePopup1 = () => {
    setIsPopup1Visible(false);
  };

  return (
    <PopupContext.Provider
      value={{
        isPopupVisible,
        isPopup1Visible,
        togglePopup,
        closePopup,
        togglePopup1,
        closePopup1,
        changeStatus1,
        changeStatus2,
        isMember,
      }}
    >
      {children}
    </PopupContext.Provider>
  );
};

export const usePopup = (): PopupContextType => {
  const context = useContext(PopupContext);
  if (!context) {
    throw new Error("usePopup must be used within a PopupProvider");
  }
  return context;
};
