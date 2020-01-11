import * as React from 'react';

import { ContextProvider } from './context/movable-resizble.context';
import Movable from './Movable';
import Resizble from './Resizable';

export default (props: any) => {
	return (
		<ContextProvider>
			<Movable {...props} >
		   <Resizble {...props}/>
			</Movable>
		</ContextProvider>
	);
};
