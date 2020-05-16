import * as React from 'react';

import { MovableResizbleProps, MovableResizbleContext } from './types';

const Context = React.createContext<MovableResizbleContext>(null);

const ContextProvider = React.forwardRef(({ children }: MovableResizbleProps, ref = null): JSX.Element => {
	const [ positions, setPositions ] = React.useState({
		x: 0,
		y: 0,
		width: 100,
		height: 100,
		maxWidth: 500,
		maxHeight: 500,
		offsetRight: 0,
		offsetBottom: 0,
		offsetTop: 0,
		offsetLeft: 0,
		 left: 0,
		 right: 0
	});
	const [ offsets, setOffsets ] = React.useState({ x: 0, y: 0 });
	const [ movableActive, setMovableActive ] = React.useState(false);
	const [ resizbleActive, setResizbleActive ] = React.useState(false);

	const movableRef = ref || React.useRef(null);


	return (
		<Context.Provider
			value={{
				positions,
				setPositions,
				offsets,
				setOffsets,
				movableActive,
				setMovableActive,
				resizbleActive,
				setResizbleActive,
				movableRef
			}}
		>
			{children}
		</Context.Provider>
	);
});

export { Context, ContextProvider };
