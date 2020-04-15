import styled from 'styled-components';

export const MovableStyled = styled.div.attrs(
	(props: { width: number; height: number;
		 x: number; y:
		 number; maxHeight:
		 number; maxWidth: number;
		  hideBorder: boolean; borderColor: string, gridBackground: boolean }) : any => ({
		style: {
			width: `${props.width}px`,
			height: `${props.height}px`,
			left: `${props.x}px`,
			top: `${props.y}px`,
			maxWidth: `${props.width}px`,
			border: `${!props.hideBorder && `1px solid ${props.borderColor}`}`,

		}
	})
)`
  min-height: 50px;
  min-width: 50px;
	position: absolute;
	box-sizing: border-box;
	background-size: 33.33333% 33.33333%;
	background-position: 12% -13%;
	background-image: ${(props: any) => props.gridBackground &&
	`linear-gradient(from 0.5px 0.0px to 10.5px  0.0px, repeat, black 5%, transparent 5%),
    linear-gradient(from 0.0px 0.5px to  0.0px 10.5px, repeat, black 5%, transparent 5%);`}
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
