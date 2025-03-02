import { signal } from '@angular/core';

export type ReallyGlobalReactiveState = {
	currentRoute: string;
	counter: number;
};

export const reallyGlobalReactiveState = signal<ReallyGlobalReactiveState>({
	currentRoute: '',
	counter: 0,
});
