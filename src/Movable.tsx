import * as React from 'react';

import { Context } from './context/movable-resizble.context';
import { calcElemInnerBox, getResizableOffsets, getPropertyStyleValueByProp} from './utils/general';

import { MovableStyled } from './ReactMovableResizble.styles';

export type MovableProps = {
	useParentBounds?: boolean;
	hideBorder?: boolean;
	children?: React.ReactNode;
	hideHandlers?: boolean;
	borderColor?: string;
	gridBackground?: boolean;
	onDrag?: Function;
	initialWidth?: number,
	initialHeight?: number,
	initialX?: number,
	initialY?: number

};

const Movable = ({ useParentBounds,
	 children,
	 hideBorder,
	 borderColor = '#000',
	 onDrag = () => {},
	 initialWidth = 100, initialHeight = 100,
	 initialX = 0, initialY = 0,
	 gridBackground = false}: MovableProps) => {
	const {
		positions,
		setPositions,
		offsets,
		setOffsets,
		setMovableActive,
		resizbleActive,
		movableRef
	} = React.useContext(Context);

	React.useEffect(()=> {
		const movableEl = movableRef.current;

		const {offsetTop, offsetBottom, offsetLeft, offsetRight} = getResizableOffsets(movableEl, movableEl.parentNode)
		onDrag(null, {...positions, offsetTop, offsetBottom, offsetLeft, offsetRight});
	}, [positions])

	React.useEffect(()=> {

		const x = initialX || positions.x;
		const y = initialY || positions.y;
		setPositions({...positions, width: initialWidth, height: initialHeight, x, y})
		onDrag(null, {positions});
	}, [initialWidth, initialHeight, initialX, initialY])


	const getMovableParentBounds = ({
		newX,
		newY
	}: {
		newX: number;
		newY: number;
	}): { xPosition: number; yPosition: number } => {
		const rect = movableRef.current.getBoundingClientRect();
		const movableEl = movableRef.current;
		const movableParent = movableEl.parentNode.getBoundingClientRect();
		let xPosition = newX,
			yPosition = newY;

		const parentInnerBoxSpacing = calcElemInnerBox(movableEl.parentNode)

		const maxParentleft = movableParent.left - rect.left;
		const maxParentRight = (movableParent.right - movableParent.left) - rect.width - parentInnerBoxSpacing;
		const maxParentTop = movableParent.top - rect.top - parentInnerBoxSpacing;
		const maxParentBottom = movableParent.bottom - movableParent.top - rect.height - parentInnerBoxSpacing;


		if (newX < maxParentleft) {
			xPosition = 0;
		}

		if (newX > maxParentRight) {
			xPosition = maxParentRight;
		}

		if (newY < maxParentTop) {
			yPosition = 0;
		}

		if (newY > maxParentBottom) {
			yPosition = maxParentBottom;
		}

		return { xPosition, yPosition };
	};

	const onMovableMouseDown = (e: React.MouseEvent) => {
		if (resizbleActive) return;
		e.preventDefault();

		let newX: number,
			newY: number,
			prevX = 0,
			prevY = 0;
			prevX = e.clientX - offsets.x;
			prevY = e.clientY - offsets.y;

		const onMovableMouseMove = (e: MouseEvent): void => {
			newX = e.clientX - prevX;
			newY = e.clientY - prevY;

			const movableEl = movableRef.current;

			const {offsetTop, offsetBottom, offsetLeft, offsetRight} = getResizableOffsets(movableEl, movableEl.parentNode)


			if (useParentBounds) {
				const { xPosition, yPosition } = getMovableParentBounds({ newX, newY });
				(newX = xPosition), (newY = yPosition);
			}

			setPositions({
				...positions,
				x: newX,
				y: newY,
				offsetTop, offsetBottom, offsetLeft, offsetRight,
				right: getPropertyStyleValueByProp(movableEl, 'right'),
				left: getPropertyStyleValueByProp(movableEl, 'left')
			});

			setOffsets({
							x: newX,
							y: newY
			});
		};

		const onMovableMouseUp = () => {
			document.removeEventListener('mousemove', onMovableMouseMove);
			document.removeEventListener('mouseup', onMovableMouseUp);

			prevX = newX;
			prevY = newY;
			setMovableActive(false);
		};

		document.addEventListener('mousemove', onMovableMouseMove);
		document.addEventListener('mouseup', onMovableMouseUp);
		setMovableActive(true);
	};

	return (
		<MovableStyled
			ref={movableRef}
			onMouseDown={onMovableMouseDown}
			width={positions.width}
			height={positions.height}
			x={positions.x}
			y={positions.y}
			maxWidth={positions.maxWidth}
			maxHeight={positions.maxHeight}
			hideBorder={hideBorder}
			borderColor={borderColor}
			gridBackground={gridBackground}

		>
			{children}
		</MovableStyled>
	);
};

export default Movable;
