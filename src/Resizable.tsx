import * as React from 'react';

import { Context } from './context/movable-resizble.context';
import { reizersMap } from './reizersMap';
import { getNameFromClassList, getPropertyStyleValueByProp} from './utils';
import { ResizbleProps } from './types';

			import { ResizerStyled } from './ReactMovableResizble.styles';

			const Resizble = ({ useParentBounds, children, hideHandlers }: ResizbleProps) => {
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

						setPositions({
							...positions,
							x,
							y,
							width,
							height
						});

						setOffsets({
							x,
							y
						})


					};

					window.addEventListener('mousemove', onResizableMouseMove);
					window.addEventListener('mouseup', onResizableMouseUp);
				};


				const calcResizablePositionByClass = ({ className, pageX, pageY, prevX, prevY,
					prevTop, prevWidth, prevHeight, prevLeft, minWidth, maxBottom }: any) => {
					const positionClasses = {
						'bottom-right': {
							width: prevWidth + (pageX - prevX),
							height: prevHeight + (pageY - prevY)
						},
						'bottom-left': {
							width: prevWidth - (pageX - prevX),
							x: calcXPositionByMaxLeft({ prevLeft, prevWidth, minWidth, x: prevLeft + (pageX - prevX) }),
							height: prevHeight + (pageY - prevY), maxBottom,
						},
						'top-right': {
							width: prevWidth + (pageX - prevX),
							height: prevHeight - (pageY - prevY),
							y: calcYPositionByMaxBottom({ y: prevTop + (pageY - prevY), maxBottom }),
						},
						'top-left': {
							width: prevWidth - (pageX - prevX),
							height: prevHeight - (pageY - prevY),
							y: calcYPositionByMaxBottom({ y: prevTop + (pageY - prevY), maxBottom }),
							x: calcXPositionByMaxLeft({ prevLeft, prevWidth, minWidth, x: prevLeft + (pageX - prevX) }),
						},
					}

					return positionClasses[className]

				}

				const getMaxPositionByParent = ({ className, height,maxParentBottom,
					 maxRight, width, x, y, maxWidth, maxHeight }: any) => {

					const positionClasses = {
						'bottom-right': {
							height: height > maxParentBottom ? maxParentBottom : height,
							width: width > maxRight ? maxRight : width,
							x,
							y
						},
						'bottom-left': {
							height: height > maxParentBottom ? maxParentBottom : height,
							x: x < 0 ? 0: x,
							width: x < 0 ? maxWidth : width,
							y
						},
						'top-right': {
							width: width > maxRight ? maxRight : width,
							y: y < 0 ? 0: y,
							height: y < 0 ? maxHeight : height,
							x
						},
						'top-left': {
							x: x < 0 ? 0: x,
							width: x < 0 ? maxWidth : width,
							y: y < 0 ? 0: y,
							height: y < 0 ? maxHeight : height,
						}
					}

					return positionClasses[className]

				}

				const calcXPositionByMaxLeft = ({ prevLeft, prevWidth, minWidth, x }: {
					prevLeft: number,
					prevWidth: number, minWidth: number, x: number
				}): number => {
					const maxLeft = prevLeft + prevWidth - minWidth;
					return x < maxLeft ? x : maxLeft
				}

				const calcYPositionByMaxBottom = ({ maxBottom, y }: { maxBottom: number, y: number }): number => {
					return y < maxBottom ? y : maxBottom
				}

				return (
					<React.Fragment>
						{reizersMap.map(({ className }) => (
							<ResizerStyled className={className}
							onMouseDown={onResizerMouseDown}
							key={className}
							hideHandlers={hideHandlers} />
						))}
						{children}
					</React.Fragment>

				);
			};

			export default Resizble;
