export const ensureProtocol = (url: string) => {
  if (!/^https?:\/\//i.test(url)) {
    return `https://www.${url}`;
  }
  return url;
};
