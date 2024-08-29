export const formatFileSize = (bytes: number) => {
  const A_KB = 1024;
  const A_MB = 1024 * 1024;
  const A_GB = 1024 * 1024 * 1024;

  if (bytes < A_KB) {
    return bytes + " B";
  } else if (bytes < A_MB) {
    return (bytes / A_KB).toFixed(2) + " KB";
  } else if (bytes < A_GB) {
    return (bytes / A_MB).toFixed(2) + " MB";
  } else {
    return (bytes / A_GB).toFixed(2) + " GB";
  }
};
