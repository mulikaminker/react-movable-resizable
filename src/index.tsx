import * as React from 'react';

import { ContextProvider} from './context/movable-resizble.context';
import Movable from './Movable';
import Resizble from './Resizable';
import { ResizbleProps } from './types';

export default (props: ResizbleProps) => {
	return (
		<ContextProvider>
			<Movable {...props}>
				<Resizble {...props} />
			</Movable>
		</ContextProvider>
	);
};

export const MovableComponent = (props: ResizbleProps) =>  {
	return (
		<ContextProvider>
			<Movable {...props}/>
		</ContextProvider>
	);
}
