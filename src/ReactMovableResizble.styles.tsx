import styled from 'styled-components';

export const MovableStyled = styled.div.attrs(
	(props: { width: number; height: number;
		 x: number; y:
		 number; maxHeight:
		 number; maxWidth: number;
		  hideBorder: boolean; borderColor: string, gridBackground: boolean; style: object, movableActive: boolean }) : any => ({
		style: {
			...props.style,
			width: `${props.width}px`,
			height: `${props.height}px`,
			left: `${props.x}px`,
			top: `${props.y}px`,
			maxWidth: `${props.width}px`,
			border: `${!props.hideBorder && `1px solid ${props.borderColor}`}`,


		}
	})
)`
	position: absolute;
	box-sizing: border-box;
	background-size: 35.33333% 35.33333%;
	background-position: -4% -5%;
	background-image: ${(props: any) => props.gridBackground && props.movableActive &&
    `linear-gradient(to right, ${props.borderColor} 1px, transparent 1px),
    linear-gradient(to bottom, ${props.borderColor} 1px, transparent 1px)`};
		cursor: ${(props: any) => props.movableActive && `move`};
`;

export const ResizerStyled = styled.div.attrs(
	(props: { hideHandlers: boolean, handlersColor: string  }): any => ({
		style: {
			background: `${props.hideHandlers ? 'transparent': props.handlersColor}`
		}
	})
)`
width: 10px;
height: 10px;
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
