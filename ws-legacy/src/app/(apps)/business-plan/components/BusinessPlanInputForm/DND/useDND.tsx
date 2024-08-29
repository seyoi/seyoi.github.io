import { useContext, useEffect, useRef, useState } from "react";

import { getAuth } from "firebase/auth";
import { deleteObject, ref, uploadBytesResumable } from "firebase/storage";

import { v4 as uuid } from "uuid";

import { BusinessPlanFilesContext } from "../../../contexts";
import type { BusinessPlanFileForDND } from "../../../types";
import { firebaseService } from "@/common/libs/FirebaseService";

export function useDND() {
  const { setFiles: setBusinessPlanFiles } = useContext(
    BusinessPlanFilesContext,
  );
  const [files, setFiles] = useState<BusinessPlanFileForDND[]>([]);
  const [isDrag, setIsDrag] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setBusinessPlanFiles(files);
  }, [files, setBusinessPlanFiles]);

  const handleFileDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();

    for (const file of e.dataTransfer.files) {
      uploadFile(file);
    }
    setIsDrag(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.currentTarget.files) return;

    for (const file of e.currentTarget.files) {
      if (getFileType(file) === "UNKNOWN") continue;
      uploadFile(file);
    }
    setIsDrag(false);
  };

  const handleLabelKeyDown = (e: React.KeyboardEvent<HTMLLabelElement>) => {
    if (e.key !== "Enter" || inputRef.current === null) return;
    inputRef.current.click();
  };

  const uploadFile = (file: File) => {
    const auth = getAuth();

    if (!auth.currentUser) throw "No Auth";

    const firebaseAnonymousUserID = auth.currentUser.uid;

    const fileID = uuid();
    const fileType = getFileType(file);
    const fileName = file.name;
    const fileSize = getByteSize(file.size);
    const filePath = `chochangpae/${firebaseAnonymousUserID}/${fileID}-${fileName}`;
    const fileProgress = 0;
    const fileStatus = "UPLOADING";

    if (fileType === "UNKNOWN") throw "Not PDF or HWP";

    try {
      const fileRef = ref(firebaseService.getStorage(), filePath);

      const uploadSnapshot = uploadBytesResumable(fileRef, file);

      setFiles((prev) => [
        ...prev,
        {
          id: fileID,
          type: fileType,
          name: fileName,
          size: fileSize,
          file,
          filePath,
          progress: fileProgress,
          status: fileStatus,
        },
      ]);

      uploadSnapshot.on("state_changed", (s) => {
        const progress = Math.round((s.bytesTransferred / s.totalBytes) * 100);
        setFiles((prev) =>
          prev.map((item) =>
            item.id === fileID
              ? {
                  ...item,
                  status: progress === 100 ? "UPLOADED" : item.status,
                  progress,
                }
              : item,
          ),
        );
      });
    } catch (err) {
      throw new Error(`ChoChangPae Upload File ${err}`);
    }
  };

  const handleDeleteFile = ({
    fileID,
    status,
    filePath,
  }: {
    fileID: string;
    status: "UPLOADING" | "UPLOADED" | "DELETING";
    filePath: string;
  }) => {
    if (status === "DELETING") return;

    setFiles((prev) =>
      prev.map((item) =>
        item.id === fileID ? { ...item, status: "DELETING" } : item,
      ),
    );

    try {
      const fileRef = ref(firebaseService.getStorage(), filePath);

      deleteObject(fileRef)
        .then(() =>
          setFiles((prev) => prev.filter((item) => item.id !== fileID)),
        )
        .catch((err) => {
          throw err;
        });
    } catch (err) {
      throw new Error(`ChoChangPae Delete File ${err}`);
    }
  };

  const handleDragEnter = () => setIsDrag(true);
  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) =>
    e.preventDefault();
  const handleDragLeave = () => setIsDrag(false);

  return {
    files,
    isDrag,
    inputRef,
    handleFileDrop,
    handleFileChange,
    handleDeleteFile,
    handleDragEnter,
    handleDragOver,
    handleDragLeave,
    handleLabelKeyDown,
  };
}

const getFileType = (file: File) => {
  if (file.type === "application/pdf") return "pdf";
  if (file.name.includes(".hwp") || file.name.includes(".hwpx")) return "hwp";

  return "UNKNOWN";
};

const getByteSize = (size: number) => {
  const byteUnits = ["KB", "MB"];

  for (let i = 0; i < byteUnits.length; i++) {
    size = Math.floor(size / 1024);

    if (size < 1024) return size + byteUnits[i];
  }

  return "0KB";
};
