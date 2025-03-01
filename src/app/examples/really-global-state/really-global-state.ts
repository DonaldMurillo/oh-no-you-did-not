import { signal } from '@angular/core';

export type ReallyGlobalState = {
	currentRoute: string;
	counter: number;
};

export const reallyGlobalReactiveState = signal<ReallyGlobalState>({
	currentRoute: '',
	counter: 0,
});
