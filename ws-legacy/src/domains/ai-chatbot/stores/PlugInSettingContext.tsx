"use client";

import { createContext, useState } from "react";

export const PlugInSettingContext = createContext<{
  buttonImageUrl: string;
  buttonLabelText: string;
  marginX: number;
  marginY: number;
  setButtonImageUrl: React.Dispatch<React.SetStateAction<string>>;
  setButtonLabelText: React.Dispatch<React.SetStateAction<string>>;
  setMarginX: React.Dispatch<React.SetStateAction<number>>;
  setMarginY: React.Dispatch<React.SetStateAction<number>>;
}>({
  buttonImageUrl: "",
  buttonLabelText: "",
  marginX: 24,
  marginY: 24,
  setButtonImageUrl: () => null,
  setButtonLabelText: () => null,
  setMarginX: () => null,
  setMarginY: () => null,
});

export const PlugInSettingContextProvider = ({
  initialButtonImageUrl,
  initialButtonLabelText,
  initialMarginX,
  initialMarginY,
  children,
}: {
  initialButtonImageUrl: string;
  initialButtonLabelText: string;
  initialMarginX: number;
  initialMarginY: number;
  children: React.ReactNode;
}) => {
  const [buttonImageUrl, setButtonImageUrl] = useState(initialButtonImageUrl);
  const [buttonLabelText, setButtonLabelText] = useState(
    initialButtonLabelText,
  );
  const [marginX, setMarginX] = useState(initialMarginX);
  const [marginY, setMarginY] = useState(initialMarginY);
  return (
    <PlugInSettingContext.Provider
      value={{
        buttonImageUrl,
        buttonLabelText,
        marginX,
        marginY,
        setButtonImageUrl,
        setButtonLabelText,
        setMarginX,
        setMarginY,
      }}
    >
      {children}
    </PlugInSettingContext.Provider>
  );
};
