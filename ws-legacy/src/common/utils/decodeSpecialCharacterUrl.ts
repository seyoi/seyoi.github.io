export const decodeSpecialCharacterUrl = (encodedString: string) => {
  const replaceChars = [";", ",", "/", "?", ":", "@", "&", "=", "+", "$"];
  let decodedString = encodedString;

  replaceChars.forEach((char) => {
    const encodedChar = "%" + char.charCodeAt(0).toString(16).toUpperCase();
    const regex = new RegExp(encodedChar, "g");
    decodedString = decodedString.replace(regex, char);
  });

  return decodedString;
};
