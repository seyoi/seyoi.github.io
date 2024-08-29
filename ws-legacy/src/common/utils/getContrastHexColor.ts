export const getContrastHexColor = (color: string) => {
  if (!isValidHexColor(color)) {
    throw new Error(`Invalid hex color format: ${color}`);
  }

  const brightness = getBrightnessHexColor(color);

  if (brightness > 125) return "#292929";

  return "#FFFFFF";
};

const getBrightnessHexColor = (color: string) => {
  if (!isValidHexColor(color)) {
    throw new Error(`Invalid hex color format: ${color}`);
  }

  const noHashtagColor = color.substring(1); // # 제거
  const rgb = parseInt(noHashtagColor, 16); // 16진수를 10진수로 변환
  const r = (rgb >> 16) & 0xff; // Red 값 추출
  const g = (rgb >> 8) & 0xff; // Green 값 추출
  const b = (rgb >> 0) & 0xff; // Blue 값 추출

  // 밝기 계산
  return (r * 299 + g * 587 + b * 114) / 1000;
};

const isValidHexColor = (color: string) => {
  const hexColorRegex = /^#([0-9a-fA-F]{6})$/;

  return hexColorRegex.test(color);
};
