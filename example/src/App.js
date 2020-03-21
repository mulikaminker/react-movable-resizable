import React, {
  Component
} from 'react';

import ReactMovableResizable from 'react-movable-resizable';

export default class App extends Component {
  render() {
    return (
      <div style={{ width: '500px', height: '500px', border: '3px #ccc solid', position: 'relative'}}>
        <ReactMovableResizable useParentBounds={true}>
        <div style={{ border: '1px red solid', height: '100%', width: '100%', boxSizing: 'border-box'}}>
        this is a test with text
        </div>
        </ReactMovableResizable>
      </div >

    );
  }
}
