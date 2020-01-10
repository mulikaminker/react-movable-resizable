import React, { useRef, useState } from 'react';
import { Movable, Resizer } from './ReactMovableResizble.styles';
import { reizersMap } from './reizersMap';
import { getNameFromClassList } from './utils';

export type MovableResizbleProps = {
	useParentBounds: boolean;
};

export default function MovableResizble({ useParentBounds }: MovableResizbleProps) {
	const [ movablePositions, setMovablePositions ] = useState({
		x: 0,
		y: 0,
		width: 100,
		height: 100,
		maxWidth: 500,
		maxHeight: 500
	});
	const [ movableOffsets, setMovableOffsets ] = useState({ x: 0, y: 0 });
	const [ movableActive, setMovableActive ] = useState(false);
	const [ resizbleActive, setResizbleActive ] = useState(false);

	const movableRef = useRef(null);

	const getParentElementPosition = () => {
		const parent = movableRef.current.parentNode;
		const { bottom, height, left, right, top, width } = parent.getBoundingClientRect();

		const resizrePosition = movableRef.current.getBoundingClientRect();

		return {
			maxWidth: width,
			maxTop: top,
			maxLeft: left,
			maxHeight: height,
			maxBottom: bottom - resizrePosition.height,
			bottom: bottom,
			right: right,
			maxRight: right - resizrePosition.width
		};
	};

	const getResizableMaxHeight = ({ position }) => {
		const resizerEl = movableRef.current;
		const rect = resizerEl.getBoundingClientRect();
		const movableParent = resizerEl.parentNode.getBoundingClientRect();

		let maxHeight;

		switch (position) {
			case 'top-right':
			case 'top-left': {
				maxHeight = movableParent.height - (movableParent.bottom - rect.bottom);
			}

			default: {
				maxHeight = movableParent.height;
			}
		}
		return maxHeight;
	};

	const onResizerMouseDown = (e: React.MouseEvent): boolean | void => {
		if (movableActive) return false;
		e.stopPropagation();

		const activeResizer = e.target;
		const position = getNameFromClassList({ classList: e.target.classList });
		const resizerEl = movableRef.current;
		const rect = resizerEl.getBoundingClientRect();
		const movableParent = resizerEl.parentNode.getBoundingClientRect();

		let prevX = e.clientX;
		let prevY = e.clientY < movableParent.top ? movableParent.top : e.clientY;
		let prevRight = rect.right;
		let newMaxHeight = getResizableMaxHeight({ position });

		const onResizableMouseUp = () => {
			window.removeEventListener('mousemove', onResizableMouseMove);
			setResizbleActive(false);
		};

		const onResizableMouseMove = (e: MouseEvent): void => {
			const resizerEl = movableRef.current;
			const rect = resizerEl.getBoundingClientRect();

			let newWidth,
				newHeight,
				newX = movablePositions.x,
				newY = movablePositions.y,
				newMaxWidth = movablePositions.maxWidth;
			const { maxTop, maxLeft, maxWidth, maxHeight, bottom, right, maxRight } = getParentElementPosition();

			let clientY = e.clientY < maxTop ? maxTop : e.clientY;

			if (activeResizer.classList.contains('bottom-right')) {
				newMaxWidth = maxWidth;

				if (rect.left + rect.width - (prevX - e.clientX) > right) {
					newWidth = right - rect.left;
				} else {
					newWidth = rect.width - (prevX - e.clientX);
				}

				if (rect.top + rect.height - (prevY - e.clientY) > bottom) {
					newHeight = bottom - rect.top;
				} else {
					newHeight = rect.height - (prevY - e.clientY);
				}
			} else if (activeResizer.classList.contains('bottom-left')) {
				newWidth = rect.width + (prevX - e.clientX);
				newX = movablePositions.x - (newWidth - movablePositions.width);

				if (newX < 0) {
					newWidth = maxWidth - (right - prevRight);
					newX = maxWidth - (right - prevRight) - newWidth;
				}
				if (rect.top + rect.height - (prevY - e.clientY) > bottom) {
					newHeight = bottom - rect.top;
				} else {
					newHeight = rect.height - (prevY - e.clientY);
				}
			} else if (activeResizer.classList.contains('top-right')) {
				if (rect.left + rect.width - (prevX - e.clientX) > right) {
					newWidth = right - rect.left;
				} else {
					newWidth = rect.width - (prevX - e.clientX);
				}

				newHeight = rect.height + (prevY - clientY);
				newY = movablePositions.y - (newHeight - movablePositions.height);

				newY = newY < 0 ? 0 : newY;
			} else if (activeResizer.classList.contains('top-left')) {
				newWidth = rect.width + (prevX - e.clientX);
				newX = movablePositions.x - (newWidth - movablePositions.width);
				if (newX < 0) {
					newWidth = maxWidth - (right - prevRight);
					newX = maxWidth - (right - prevRight) - newWidth;
				}

				newHeight = rect.height + (prevY - e.clientY);
				newY = movablePositions.y - (newHeight - movablePositions.height);
				newY = newY < 0 ? 0 : newY;
			}

			setMovablePositions({
				...movablePositions,
				x: newX,
				y: newY,
				width: newWidth,
				height: newHeight,
				maxHeight: newMaxHeight > movableParent.height ? movableParent.height : newMaxHeight
			});
			setMovableOffsets({
				x: newX,
				y: newY
			});

			prevY = clientY;
			prevX = e.clientX;
		};

		window.addEventListener('mousemove', onResizableMouseMove);
		window.addEventListener('mouseup', onResizableMouseUp);
	};

	const getMovableParentBounds = ({ newX, newY }): { xPosition: number; yPosition: number } => {
		const rect = movableRef.current.getBoundingClientRect();
		const movableEl = movableRef.current;
		const movableParent = movableEl.parentNode.getBoundingClientRect();
		let xPosition = newX,
			yPosition = newY;

		const maxParentleft = movableParent.left - rect.left;
		const maxParentRight = movableParent.right - movableParent.left - rect.width;
		const maxParentTop = movableParent.top - rect.top;
		const maxParentBottom = movableParent.bottom - movableParent.top - rect.height;

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
		prevX = e.clientX - movableOffsets.x;
		prevY = e.clientY - movableOffsets.y;

		const onMovableMouseMove = (e: React.MouseEvent) => {
			newX = e.clientX - prevX;
			newY = e.clientY - prevY;

			if (useParentBounds) {
				const { xPosition, yPosition } = getMovableParentBounds({ newX, newY });
				(newX = xPosition), (newY = yPosition);
			}

			setMovablePositions({
				...movablePositions,
				x: newX,
				y: newY
			});

			setMovableOffsets({
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
		<Movable
			ref={movableRef}
			onMouseDown={onMovableMouseDown}
			width={movablePositions.width}
			height={movablePositions.height}
			x={movablePositions.x}
			y={movablePositions.y}
			maxWidth={movablePositions.maxWidth}
			maxHeight={movablePositions.maxHeight}
		>
			{reizersMap.map(({ className }) => (
				<Resizer className={className} onMouseDown={onResizerMouseDown} key={className} />
			))}
		</Movable>
	);
}
