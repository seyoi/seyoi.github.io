// 이미지 MIME 타입의 패턴을 정규 표현식으로 정의
export const isImageFileType = (fileType: string) =>
  /^image\/(jpeg|png|gif|bmp|svg\+xml)$/.test(fileType);
