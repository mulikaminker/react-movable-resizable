import React, {
  Component
} from 'react';

import ReactMovableResizable from 'react-movable-resizable';

export default class App extends Component {
  render() {
    return (
      <div style={{ width: '500px', height: '500px', border: '3px #ccc solid', position: 'relative'}}>
        <ReactMovableResizable useParentBounds={true} borderColor="red" handlersColor="red">
        </ReactMovableResizable>
      </div >

    );
  }
}
