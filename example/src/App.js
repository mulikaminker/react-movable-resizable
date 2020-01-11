import React, {
  Component
} from 'react';

import ReactMovableResizable from 'react-movable-resizable';

export default class App extends Component {
  render() {
    return (
      <div style={{ width: '1000px', height: '1000px', margin: '50px', border: '1px #ccc solid' }}>
        <ReactMovableResizable useParentBounds={false} />
      </div >

    );
  }
}
