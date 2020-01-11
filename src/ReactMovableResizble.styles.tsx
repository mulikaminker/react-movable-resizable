import styled from 'styled-components';

export const MovableStyled = styled.div.attrs(
	(props: { width: number; height: number; x: number; y: number; maxHeight: number }): any => ({
		style: {
			width: `${props.width}px`,
			height: `${props.height}px`,
			transform: `translate(${props.x}px, ${props.y}px)`,
			maxHeight: `${props.maxHeight}px`
		}
	})
)`
  border: 1px red solid;
  box-sizing: border-box;
  position: absolute;
  min-height: 50px;
  min-width: 50px;
`;

export const ResizerStyled = styled.div`
	width: 20px;
	height: 20px;
	border-radius: 50%;
	background: #d5d6f3;
	border: 2px solid #ffffff;
	position: absolute;

	&.top-left {
		left: -5px;
		top: -5px;
		cursor: nwse-resize;
	}
	&.top-right {
		right: -5px;
		top: -5px;
		cursor: nesw-resize;
	}
	&.bottom-left {
		left: -5px;
		bottom: -5px;
		cursor: nesw-resize;
	}
	&.bottom-right {
		right: -5px;
		bottom: -5px;
		cursor: nwse-resize;
	}
`;
