import React, {useRef, useState} from "react";

import ReactMovableResizable from "react-movable-resizable";

export default () => {
  const myRef = useRef(null);
  const [transition, setTransition] = useState("")
  const [size, setSize] = useState({width: 100, height: 100, x: 0, y: 0})
    return (
        <div>
        <button onClick={() =>{
          setTransition("all .5s ease-in-out");
          setSize({width: 200, height: 300, x: 300 / 2, y: 100})
          setTimeout(() =>{
            setTransition("")
          }, 1000)
        }}>move!</button>
            <div
                style={{
                    width: "500px",
                    height: "500px",
                    border: "3px #ccc solid",
                    position: "relative"
                }}
            >
                <ReactMovableResizable
                  ref={myRef}
                    useParentBounds={true}
                    gridBackground
                    initialWidth={size.width}
                    initialHeight={size.height}
                    initialX={size.x}
                    initialY={size.y}
                    borderColor="red"
                    handlersColor="red"
                    width={200}
                    height={300}
                    style={{transition}}
                ></ReactMovableResizable>
            </div>
        </div>
    );
};
