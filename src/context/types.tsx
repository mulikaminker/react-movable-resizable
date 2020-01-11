import * as React from 'react';

export type MovableResizbleProps = {
	children: React.ReactNode;
};

export type Position = {
	x: number;
	y: number;
	width: number;
	height: number;
	maxWidth: number;
	maxHeight: number;
};

export type Offset = {
	x: number;
	y: number;
};

export type MovableResizbleContext = {
	positions: Position;
	setPositions: Function;
	offsets: Offset;
	setOffsets: Function;
	movableActive: boolean;
	setMovableActive: Function;
	resizbleActive: boolean;
	setResizbleActive: Function;
	movableRef: any;
};
