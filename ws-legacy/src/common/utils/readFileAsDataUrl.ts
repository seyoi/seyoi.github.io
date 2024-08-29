export const readFileAsDataURL = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.onload = (e) => {
      if (e.target && typeof e.target.result === "string") {
        resolve(e.target.result);
      } else {
        reject(new Error("FileReader result is not a valid string."));
      }
    };

    fileReader.onerror = () => {
      reject(new Error("Failed to read file."));
    };

    fileReader.readAsDataURL(file);
  });
};
