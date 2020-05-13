import * as React from 'react';

import { Context } from './context/movable-resizble.context';
import { reizersMap } from './reizersMap';
import { getNameFromClassList, getPropertyStyleValueByProp, getResizableOffsets} from './utils/general';
import { calcResizablePositionByClass, getMaxPositionByParent } from './utils/resizable';

import { ResizbleProps } from './types';

import { ResizerStyled } from './ReactMovableResizble.styles';

			const Resizble = ({ useParentBounds,
				children, hideHandlers,
				handlersColor = '#000'
			}: ResizbleProps) => {
				const { positions, setPositions, setOffsets, movableActive, setResizbleActive, movableRef } = React.useContext(
					Context
				);

				const reizablePropertiesMap = [
					{ name: 'prevRight', property: 'right' },
					{ name: 'prevTop', property: 'top' },
					{ name: 'prevBottom', property: 'bottom' },
					{ name: 'prevLeft', property: 'left' },
					{ name: 'prevWidth', property: 'width' },
					{ name: 'prevHeight', property: 'height' },
					{ name: 'minWidth', property: 'min-width' },
					{ name: 'maxRight', property: 'right' }
				];

				const getPrevReizableStyle = (element: HTMLElement) => {
					return reizablePropertiesMap.map((prop) => {
						return getPropertyStyleValueByProp(element, prop.property);
					});
				};

				const getResizableMaxHeight = (position: string): number => {
					const resizerEl = movableRef.current;
					const rect = resizerEl.getBoundingClientRect();
					const movableParent = resizerEl.parentNode.getBoundingClientRect();
					const prevHeight = parseFloat(getComputedStyle(resizerEl, null).getPropertyValue('height').replace('px', ''));

					let maxHeight;

					switch (position) {
						case 'top-right':
						case 'top-left': {
							maxHeight = resizerEl.offsetTop + prevHeight;
							break;
						}

						case 'bottom-right':
						case 'bottom-left': {
							maxHeight = movableParent.height - (resizerEl.parentNode.offsetTop + rect.height)
							break;
						}
					}
					return maxHeight;
				};

				const getResizableMaxRight = (): number => {
					const resizerEl = movableRef.current;
					const childLeft = parseFloat(getComputedStyle(resizerEl, null).getPropertyValue('left').replace('px', ''));
					const parent = movableRef.current.parentNode;
					const width = parseFloat(getComputedStyle(parent, null).getPropertyValue('width').replace('px', ''));
					const maxRight = width - childLeft;

					return maxRight;
				};

				let prevX = 0;
				let prevY = 0;
				let prevRight = 0;
				let prevWidth = 0;
				let prevHeight = 0;
				let prevLeft = 0;
				let prevTop = 0;
				let prevBottom = 0;
				let minWidth = 0;

				const onResizerTouchStart = (e: React.TouchEvent):  boolean | void => {

					if (movableActive) return false;
					e.stopPropagation();

					const activeResizer = e.target as Element;
					const resizerEl = movableRef.current;

					const event = e.touches[0]

					prevX = event.pageX;
					prevY = event.pageY;
					[prevRight, prevTop, prevBottom, prevLeft, prevWidth, prevHeight, minWidth] = getPrevReizableStyle(resizerEl);

					const maxRight = getResizableMaxRight();
					const maxWidth = prevWidth + resizerEl.offsetLeft;

					const onResizableTouchEnd = () => {
						window.removeEventListener('touchmove', onResizerTouchMove);
						setResizbleActive(false);
					};

					const onResizerTouchMove = (e: TouchEvent): void => {
						const event = e.touches[0]

						const resizerEl = movableRef.current;
						const pageY = event.pageY, pageX = event.pageX

						const activeResizerClassName = getNameFromClassList(activeResizer.classList);

						const maxParentBottom = getPropertyStyleValueByProp(resizerEl.parentNode, 'height') - (resizerEl.offsetTop);
						const maxBottom = prevHeight + prevTop - minWidth;

						let { width, height, x = positions.x, y = positions.y } = calcResizablePositionByClass({
							className: activeResizerClassName,
							pageX, pageY, prevX, prevY,
							prevTop, prevWidth, prevHeight, prevLeft,
							minWidth, maxBottom, x: positions.x, y: positions.y
						})

						if (useParentBounds) {
							const maxHeight = getResizableMaxHeight(activeResizerClassName)
							const parentBounds = getMaxPositionByParent({className: activeResizerClassName,
								 height, maxHeight, width,
									maxRight, x, y, maxWidth, maxParentBottom })
							width = parentBounds.width;
							height = parentBounds.height;
							x = parentBounds.x;
							y = parentBounds.y

						}


						const {offsetTop, offsetBottom, offsetLeft, offsetRight} = getResizableOffsets(resizerEl, resizerEl.parentNode)

						setPositions({
							...positions,
							x,
							y,
							width,
							height,
							offsetTop,
							offsetBottom,
							offsetRight,
							offsetLeft,
							right: getPropertyStyleValueByProp(resizerEl, 'right'),
							left: getPropertyStyleValueByProp(resizerEl, 'left')
						});

						setOffsets({
							x,
							y
						})


					};

					window.addEventListener('touchmove', onResizerTouchMove);
					window.addEventListener('touchend', onResizableTouchEnd);
				};

				const onResizerMouseDown = (e: React.MouseEvent): boolean | void => {
					if (movableActive) return false;
					e.stopPropagation();

					const activeResizer = e.target as Element;
					const resizerEl = movableRef.current;

					prevX = e.pageX;
					prevY = e.pageY;
					[prevRight, prevTop, prevBottom, prevLeft, prevWidth, prevHeight, minWidth] = getPrevReizableStyle(resizerEl);

					const maxRight = getResizableMaxRight();
					const maxWidth = prevWidth + resizerEl.offsetLeft;

					const onResizableMouseUp = () => {
						window.removeEventListener('mousemove', onResizableMouseMove);
						setResizbleActive(false);

					};

					const onResizableMouseMove = (e: MouseEvent): void => {
						const resizerEl = movableRef.current;
						const pageY = e.pageY, pageX = e.pageX

						const activeResizerClassName = getNameFromClassList(activeResizer.classList);

						const maxParentBottom = getPropertyStyleValueByProp(resizerEl.parentNode, 'height') - (resizerEl.offsetTop);
						const maxBottom = prevHeight + prevTop - minWidth;

						let { width, height, x = positions.x, y = positions.y } = calcResizablePositionByClass({
							className: activeResizerClassName,
							pageX, pageY, prevX, prevY,
							prevTop, prevWidth, prevHeight, prevLeft,
							minWidth, maxBottom, x: positions.x, y: positions.y
						})

						if (useParentBounds) {
							const maxHeight = getResizableMaxHeight(activeResizerClassName)
							const parentBounds = getMaxPositionByParent({className: activeResizerClassName,
								 height, maxHeight, width,
								  maxRight, x, y, maxWidth, maxParentBottom })
							width = parentBounds.width;
							height = parentBounds.height;
							x = parentBounds.x;
							y = parentBounds.y

						}


						const {offsetTop, offsetBottom, offsetLeft, offsetRight} = getResizableOffsets(resizerEl, resizerEl.parentNode)

						setPositions({
							...positions,
							x,
							y,
							width,
							height,
							offsetTop,
							offsetBottom,
							offsetRight,
							offsetLeft,
							right: getPropertyStyleValueByProp(resizerEl, 'right'),
							left: getPropertyStyleValueByProp(resizerEl, 'left')
						});

						setOffsets({
							x,
							y
						})


					};

					window.addEventListener('mousemove', onResizableMouseMove);
					window.addEventListener('mouseup', onResizableMouseUp);
				};


				return (
					<React.Fragment>
						{reizersMap.map(({ className }) => (
							<ResizerStyled className={className}
							handlersColor={handlersColor}
							onMouseDown={onResizerMouseDown}
							onTouchStart={onResizerTouchStart}
							key={className}
							hideHandlers={hideHandlers} />
						))}
						{children}
					</React.Fragment>

				);
			};

			export default Resizble;
