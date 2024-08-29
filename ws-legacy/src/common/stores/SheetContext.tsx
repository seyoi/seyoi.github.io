"use client";

import { useRouter } from "next/navigation";
import { createContext } from "react";

export const SheetContext = createContext<{ hideSheet: () => void }>({
  hideSheet: () => null,
});

export default function SheetContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const hideSheet = () => router.back();

  return (
    <SheetContext.Provider value={{ hideSheet }}>
      {children}
    </SheetContext.Provider>
  );
}
