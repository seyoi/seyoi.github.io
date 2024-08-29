"use client";

import { createContext, useState } from "react";

export const BotProfileContext = createContext<{
  plugInId: string;
  avatarUrl: string;
  name: string;
  welcomeMessage: string;
  themeColor: string;
  coverImageUrl: string | null;
  setAvatarUrl: React.Dispatch<React.SetStateAction<string>>;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setWelcomeMessage: React.Dispatch<React.SetStateAction<string>>;
  setThemeColor: React.Dispatch<React.SetStateAction<string>>;
  setCoverImageUrl: React.Dispatch<React.SetStateAction<string | null>>;
}>({
  plugInId: "",
  avatarUrl: "",
  name: "",
  welcomeMessage: "",
  themeColor: "",
  coverImageUrl: null,
  setAvatarUrl: () => null,
  setName: () => null,
  setWelcomeMessage: () => null,
  setThemeColor: () => null,
  setCoverImageUrl: () => null,
});

export const BotProfileContextProvider = ({
  initilalPlugInId,
  initialAvatarUrl,
  initialBotName,
  initialBotWelcomeMessage,
  initialThemeColor,
  initialCoverImageUrl,
  children,
}: {
  initilalPlugInId: string;
  initialAvatarUrl: string;
  initialBotName: string;
  initialBotWelcomeMessage: string;
  initialThemeColor: string;
  initialCoverImageUrl: string | null;
  children: React.ReactNode;
}) => {
  const [plugInId] = useState(initilalPlugInId);
  const [avatarUrl, setAvatarUrl] = useState(initialAvatarUrl);
  const [name, setName] = useState(initialBotName);
  const [welcomeMessage, setWelcomeMessage] = useState(
    initialBotWelcomeMessage,
  );
  const [themeColor, setThemeColor] = useState(initialThemeColor);
  const [coverImageUrl, setCoverImageUrl] = useState(initialCoverImageUrl);

  return (
    <BotProfileContext.Provider
      value={{
        plugInId,
        avatarUrl,
        name,
        welcomeMessage,
        themeColor,
        coverImageUrl,
        setAvatarUrl,
        setName,
        setWelcomeMessage,
        setThemeColor,
        setCoverImageUrl,
      }}
    >
      {children}
    </BotProfileContext.Provider>
  );
};
