import * as React from 'react';

import { Context } from './context/movable-resizble.context';
import { reizersMap } from './reizersMap';
import { getNameFromClassList } from './utils';

import { ResizerStyled } from './ReactMovableResizble.styles';

export type ResizbleProps = {
	useParentBounds: boolean;
};

const Resizble = ({ useParentBounds}: ResizbleProps) => {
	const {
		positions,
		setPositions,
		setOffsets,
		movableActive,
		setResizbleActive,
		movableRef
	} = React.useContext(Context);

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

			if(useParentBounds) {
				//TODO
			}

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

	return (
		<>
			{reizersMap.map(({ className }) => (
				<ResizerStyled
					className={className}
					onMouseDown={onResizerMouseDown}
					key={className}
					/>
			))}
			</>
	);
}

export default Resizble
