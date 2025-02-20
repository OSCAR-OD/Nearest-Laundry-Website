export const truncateString = (str, strLgth = 30) => {
  const truncStr = str.substring(0, strLgth);

  return str.length > strLgth ? `${truncStr}...` : str;
};