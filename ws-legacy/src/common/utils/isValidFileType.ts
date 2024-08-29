// pdf, xlsx, docx, csv
const FILE_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/csv",
  ".hwp",
];

export const isValidFileType = ({
  fileName,
  fileType,
}: {
  fileName: string;
  fileType: string;
}) => {
  if (fileName.includes(".hwp")) {
    return true;
  }

  return FILE_TYPES.includes(fileType);
};

export const getAcceptFileString = () =>
  FILE_TYPES.reduce((acc, curr) => acc + `${curr}, `, "");
