export const generateRandomInt = () => {
  const MIN = 1;
  const MAX = 9999;
  const minCeiled = Math.ceil(MIN);
  const maxFloored = Math.floor(MAX);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
};
