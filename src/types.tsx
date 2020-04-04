export type ResizbleProps = {
	useParentBounds?: boolean;
	maxWidth?: number;
	maxHeight?: number;
	className?: string;
	children?: React.ReactNode;
	 hideHandlers?: boolean;
	 hideBorder?: boolean;
	 handlersColor: string;
};


export type CalcResizableTypes = {
	className: string;
	pageX?: number;
	pageY?: number;
	prevX?: number;
	prevY?: number;
  prevTop?: number;
	prevWidth?: number;
	prevHeight?: number;
	prevLeft?: number;
	minWidth?: number;
	minHeight?: number;
	maxBottom?: number;
	x?: number;
	y?: number;
};


export type MaxPositionByParentTypes = {
	className: string;
	maxParentBottom: number;
	maxRight: number;
	width: number;
	height: number;
	x: number;
	y: number;
	maxWidth: number;
	maxHeight: number;
}
