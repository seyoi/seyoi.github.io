"use client";

import { createContext, useState } from "react";
import { PopUp } from "@/common/components/PopUp";

type PopUpConfig = {
  title: string;
  subTitle: string;
  actionType: "ok" | "delete";
  action: () => Promise<void>;
};

export const PopUpContext = createContext<{
  config: PopUpConfig | null;
  showPopUp: (config: PopUpConfig) => void;
  hidePopUp: () => void;
}>({
  config: null,
  showPopUp: () => null,
  hidePopUp: () => null,
});

export default function PopUpContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [config, setConfig] = useState<PopUpConfig | null>(null);
  const [isShow, setIsShow] = useState(false);

  const showPopUp = (config: PopUpConfig) => {
    setConfig(config);
    setIsShow(true);
  };

  const hidePopUp = () => {
    setConfig(null);
    setIsShow(false);
  };

  return (
    <PopUpContext.Provider value={{ config, showPopUp, hidePopUp }}>
      {children}
      {isShow && <PopUp />}
    </PopUpContext.Provider>
  );
}
