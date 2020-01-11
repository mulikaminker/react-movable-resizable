import React from 'react';
import { storiesOf } from '@storybook/react';

import ReactMovableResizable from 'react-movable-resizable';


storiesOf("React Movable Resizable", module)
	.add('without parent', () => <div style={{ width: '500px', height: '500px' }}>
		<ReactMovableResizable useParentBounds={false} /> </div>)
	.add('with useParentBounds set to true', () => <div style={{ width: '500px', height: '500px' }}>
		<ReactMovableResizable useParentBounds /> </div >);
