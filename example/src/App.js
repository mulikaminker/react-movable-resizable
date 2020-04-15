import React, {
  Component
} from 'react';

import ReactMovableResizable from 'react-movable-resizable';


export default () => {
    return (
      <div style={{ width: '500px', height: '500px', border: '3px #ccc solid', position: 'relative'}}>
        <ReactMovableResizable useParentBounds={true}
        gridBackground
        initialWidth={500}
        initialHeight={500}
         borderColor="red"
         onDrag={(e, {positions})=> console.log(positions)}
          handlersColor="red" width={200} height={300}>
        </ReactMovableResizable>
      </div >

    );
  }
