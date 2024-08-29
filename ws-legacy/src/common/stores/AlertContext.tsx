"use client";

import { createContext, useState } from "react";
import { generateUUID } from "@/common/utils/generateUUID";
import AlertList from "@/common/components/AlertList";
import type { Alert } from "@/common/types/Alert";

export const AlertContext = createContext<{
  addAlert: (alert: Alert) => void;
  removeAlert: (alert: Alert) => void;
}>({
  addAlert: () => null,
  removeAlert: () => null,
});

export default function AlertContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [alertList, setAlertList] = useState<Alert[]>([]);

  const addAlert = (alert: Alert) =>
    setAlertList((prev) => prev.concat({ id: generateUUID(), ...alert }));

  const removeAlert = (alert: Alert) =>
    setAlertList((prev) => prev.filter((item) => item.id !== alert.id));

  return (
    <AlertContext.Provider
      value={{
        addAlert,
        removeAlert,
      }}
    >
      {children}
      <AlertList alertList={alertList} />
    </AlertContext.Provider>
  );
}
