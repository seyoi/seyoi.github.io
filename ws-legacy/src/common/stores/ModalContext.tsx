"use client";

import { useRouter } from "next/navigation";
import { createContext } from "react";

export const ModalContext = createContext<{ hideModal: () => void }>({
  hideModal: () => null,
});

export default function ModalContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const hideModal = () => router.back();

  return (
    <ModalContext.Provider value={{ hideModal }}>
      {children}
    </ModalContext.Provider>
  );
}
