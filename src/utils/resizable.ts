import { CalcResizableTypes, MaxPositionByParentTypes } from '../types'

export const calcXPositionByMaxLeft = ({ prevLeft, prevWidth, minWidth, x }: {
    prevLeft: number,
    prevWidth: number, minWidth: number, x: number
}): number => {
    const maxLeft = prevLeft + prevWidth - minWidth;
    return x < maxLeft ? x : maxLeft
}

export const calcYPositionByMaxBottom = ({ maxBottom, y }: { maxBottom: number, y: number }): number => {
    return y < maxBottom ? y : maxBottom
}



export const calcResizablePositionByClass = ({ className, pageX, pageY, prevX, prevY,
    prevTop, prevWidth, prevHeight, prevLeft, minWidth, maxBottom }: CalcResizableTypes) => {
    const positionClasses = {
        'bottom-right': {
            width: prevWidth + (pageX - prevX),
            height: prevHeight + (pageY - prevY)
        },
        'bottom-left': {
            width: prevWidth - (pageX - prevX),
            x: calcXPositionByMaxLeft({ prevLeft, prevWidth, minWidth, x: prevLeft + (pageX - prevX) }),
            height: prevHeight + (pageY - prevY), maxBottom,
        },
        'top-right': {
            width: prevWidth + (pageX - prevX),
            height: prevHeight - (pageY - prevY),
            y: calcYPositionByMaxBottom({ y: prevTop + (pageY - prevY), maxBottom }),
        },
        'top-left': {
            width: prevWidth - (pageX - prevX),
            height: prevHeight - (pageY - prevY),
            y: calcYPositionByMaxBottom({ y: prevTop + (pageY - prevY), maxBottom }),
            x: calcXPositionByMaxLeft({ prevLeft, prevWidth, minWidth, x: prevLeft + (pageX - prevX) }),
        },
    }

    return positionClasses[className]
}


export const getMaxPositionByParent = ({ className, height, maxParentBottom,
    maxRight, width, x, y, maxWidth, maxHeight }: MaxPositionByParentTypes) => {

    const positionClasses = {
        'bottom-right': {
            height: height > maxParentBottom ? maxParentBottom : height,
            width: width > maxRight ? maxRight : width,
            x,
            y
        },
        'bottom-left': {
            height: height > maxParentBottom ? maxParentBottom : height,
            x: x < 0 ? 0 : x,
            width: x < 0 ? maxWidth : width,
            y
        },
        'top-right': {
            width: width > maxRight ? maxRight : width,
            y: y < 0 ? 0 : y,
            height: y < 0 ? maxHeight : height,
            x
        },
        'top-left': {
            x: x < 0 ? 0 : x,
            width: x < 0 ? maxWidth : width,
            y: y < 0 ? 0 : y,
            height: y < 0 ? maxHeight : height,
        }
    }

    return positionClasses[className]

}
