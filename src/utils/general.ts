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


export const getPropertyStyleValueByProp = (element: HTMLElement, prop: string): number => {
    return parseFloat(getComputedStyle(element)[prop]);
};

export const calcElemInnerBox = (element: HTMLElement): number => {
    const padding = getPropertyStyleValueByProp(element, 'paddingLeft') +
        getPropertyStyleValueByProp(element, 'paddingRight');
    const borderWidth = getPropertyStyleValueByProp(element, 'borderWidth')

    return borderWidth - padding;
}

export const getResizableOffsets = (resizble: HTMLElement, parent: HTMLElement) => {
    return {
        offsetRight: getPropertyStyleValueByProp(resizble, 'right') - getPropertyStyleValueByProp(parent, 'right'),
        offsetTop: resizble.offsetTop,
        offsetLeft: resizble.offsetLeft,
        offsetBottom: getPropertyStyleValueByProp(resizble, 'bottom') - getPropertyStyleValueByProp(parent, 'bottom')

    }

}
