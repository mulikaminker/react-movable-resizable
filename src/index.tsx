import * as React from "react";

import { ContextProvider } from "./context/movable-resizble.context";
import Movable from "./Movable";
import Resizble from "./Resizable";
import { ResizbleProps } from "./types";

export default React.forwardRef((props: ResizbleProps, ref) => {
    return (
        <ContextProvider ref={ref}>
            <Movable {...props}>
                <Resizble {...props} />
            </Movable>
        </ContextProvider>
    );
});

export const MovableComponent = React.forwardRef(
    (props: ResizbleProps, ref) => {
        return (
            <ContextProvider ref={ref}>
                <Movable {...props} />
            </ContextProvider>
        );
    }
);
