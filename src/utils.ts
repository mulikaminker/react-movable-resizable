export const getNameFromClassList = (classList: []): string => {
	const clArrayLength = classList.length;

	return classList[clArrayLength - 1];
};
