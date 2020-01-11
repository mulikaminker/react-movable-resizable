import * as React from 'react';

import { ContextProvider } from './context/movable-resizble.context';
import ReactMovableResizable from './ReactMovableResizable';

export default (props: any) => {
	return (
		<ContextProvider>
			<ReactMovableResizable {...props} />
		</ContextProvider>
	);
};
