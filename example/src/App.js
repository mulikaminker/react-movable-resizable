import React, {useState} from 'react'


import ReactMovableResizable, {Movable} from 'react-movable-resizable';


export default () => {
  const [positions, setPositions] = useState({x: 0, y: 0, width: 500, height: 500})
    return (
      <div>
      <input value={positions.x} onChange={(e)=> setPositions({...positions, x: e.target.value})}/>
      <input value={positions.y} onChange={(e)=> setPositions({...positions, y: e.target.value})}/>
      <input value={positions.width} type="number" onChange={(e)=> setPositions({...positions, width: e.target.value})}/>

      <div style={{ width: '500px', height: '500px', border: '3px #ccc solid', position: 'relative'}}>
        <ReactMovableResizable useParentBounds={true}
        gridBackground
        onDrag={( e, positions)=> setPositions(positions) }
        initialWidth={200}
        initialHeight={200}
        initialX={500}
        initialY={10}
         borderColor="red"
          handlersColor="red" width={200} height={300}>
        </ReactMovableResizable>
      </div >
      </div>

    );
  }
