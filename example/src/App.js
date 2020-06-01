import React from "react";

import ReactMovableResizable, { Movable } from "react-movable-resizable";

export default () => {
    return (
        <div>
            <div
                style={{
                    width: "500px",
                    height: "500px",
                    border: "3px #ccc solid",
                    position: "relative"
                }}
            >
                <ReactMovableResizable
                    useParentBounds={false}
                    gridBackground
                    initialWidth={200}
                    initialHeight={200}
                    initialX={500}
                    initialY={10}
                    borderColor="red"
                    handlersColor="red"
                    width={200}
                    height={300}
                ></ReactMovableResizable>
            </div>
        </div>
    );
};
