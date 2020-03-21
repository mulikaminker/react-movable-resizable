import styled from 'styled-components';

export const MovableStyled = styled.div.attrs(
	(props: { width: number; height: number;
		 x: number; y:
		 number; maxHeight:
		 number; maxWidth: number;
		  hideBorder: boolean  }) : any => ({
		style: {
			width: `${props.width}px`,
			height: `${props.height}px`,
			left: `${props.x}px`,
			top: `${props.y}px`,
			maxWidth: `${props.width}px`,
			border: `${!props.hideBorder && '1px solid #000'}`
		}
	})
)`
  min-height: 50px;
  min-width: 50px;
	position: absolute;
	box-sizing: border-box;
`;

export const ResizerStyled = styled.div.attrs(
	(props: { hideHandlers: boolean  }): any => ({
		style: {
			background: `${props.hideHandlers ? 'transparent': '#000'}`
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
