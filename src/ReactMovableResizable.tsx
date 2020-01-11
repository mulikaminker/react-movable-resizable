import * as React from 'react';

import { Context } from './context/movable-resizble.context';
import { reizersMap } from './reizersMap';
import { getNameFromClassList } from './utils';

import { Movable, Resizer } from './ReactMovableResizble.styles';

export type MovableResizbleProps = {
	useParentBounds: boolean;
};

export default function MovableResizble({ useParentBounds }: MovableResizbleProps) {
	const { positions, setPositions, offsets, setOffsets, movableActive, setMovableActive, resizbleActive,setResizbleActive, movableRef } = React.useContext(Context);


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

	const getResizableMaxHeight = (position: string): number => {
		const resizerEl = movableRef.current;
		const rect = resizerEl.getBoundingClientRect();
		const movableParent = resizerEl.parentNode.getBoundingClientRect();

		let maxHeight;

		switch (position) {
			case 'top-right':
			case 'top-left': {
				maxHeight = movableParent.height - (movableParent.bottom - rect.bottom);
				break;
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

		const activeResizer = e.target as Element;
		const position = getNameFromClassList(activeResizer.classList);
		const resizerEl = movableRef.current;
		const rect = resizerEl.getBoundingClientRect();
		const movableParent = resizerEl.parentNode.getBoundingClientRect();

		let prevX = e.clientX;
		let prevY = e.clientY < movableParent.top ? movableParent.top : e.clientY;
		let prevRight = rect.right;
		let newMaxHeight = getResizableMaxHeight(position);

		const onResizableMouseUp = () => {
			window.removeEventListener('mousemove', onResizableMouseMove);
			setResizbleActive(false);
		};

		const onResizableMouseMove = (e: MouseEvent): void => {
			const resizerEl = movableRef.current;
			const rect = resizerEl.getBoundingClientRect();

			let newWidth;
			let newHeight;
			let newX = positions.x;
			let newY = positions.y;
			const { maxTop, maxWidth, bottom, right } = getParentElementPosition();

			let clientY = e.clientY < maxTop ? maxTop : e.clientY;

			if (activeResizer.classList.contains('bottom-right')) {
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
				newX = positions.x - (newWidth - positions.width);

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
				newY = positions.y - (newHeight - positions.height);

				newY = newY < 0 ? 0 : newY;
			} else if (activeResizer.classList.contains('top-left')) {
				newWidth = rect.width + (prevX - e.clientX);
				newX = positions.x - (newWidth - positions.width);
				if (newX < 0) {
					newWidth = maxWidth - (right - prevRight);
					newX = maxWidth - (right - prevRight) - newWidth;
				}

				newHeight = rect.height + (prevY - e.clientY);
				newY = positions.y - (newHeight - positions.height);
				newY = newY < 0 ? 0 : newY;
			}

			setPositions({
				...positions,
				x: newX,
				y: newY,
				width: newWidth,
				height: newHeight,
				maxHeight: newMaxHeight > movableParent.height ? movableParent.height : newMaxHeight
			});
			setOffsets({
				x: newX,
				y: newY
			});

			prevY = clientY;
			prevX = e.clientX;
		};

		window.addEventListener('mousemove', onResizableMouseMove);
		window.addEventListener('mouseup', onResizableMouseUp);
	};

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
		prevX = e.clientX - offsets.x;
		prevY = e.clientY - offsets.y;

		const onMovableMouseMove = (e: MouseEvent): void => {
			newX = e.clientX - prevX;
			newY = e.clientY - prevY;

			if (useParentBounds) {
				const { xPosition, yPosition } = getMovableParentBounds({ newX, newY });
				(newX = xPosition), (newY = yPosition);
			}

			setPositions({
				...positions,
				x: newX,
				y: newY
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
		<Movable
			ref={movableRef}
			onMouseDown={onMovableMouseDown}
			width={positions.width}
			height={positions.height}
			x={positions.x}
			y={positions.y}
			maxWidth={positions.maxWidth}
			maxHeight={positions.maxHeight}
		>
			{reizersMap.map(({ className }) => (
				<Resizer className={className} onMouseDown={onResizerMouseDown} key={className} />
			))}
		</Movable>
	);
}
