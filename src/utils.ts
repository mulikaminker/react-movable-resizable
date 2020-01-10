export const getNameFromClassList = (classList: DOMTokenList): string => {
  const clArrayLength = classList.length;

  return classList[clArrayLength - 1];
};
