export const getNameFromClassList = (classList: DOMTokenList): string => {
    const clArrayLength = classList.length;

    return classList[clArrayLength - 1];
};

export const getParentElementPosition = (movableRef: any) => {
    const parent = movableRef.current.parentNode;
    const { bottom, height, left, right, top, width } = parent.getBoundingClientRect();
    const resizrePosition = movableRef.current.getBoundingClientRect();

    return {
        maxWidth: width,
        maxTop: top,
        maxLeft: left,
        maxHeight: height,
        maxBottom: bottom - resizrePosition.height,
        bottom: bottom,
        right: right,
        maxRight: right - resizrePosition.width
    };
};
