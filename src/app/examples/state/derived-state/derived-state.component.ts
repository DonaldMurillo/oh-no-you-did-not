import { Component, linkedSignal } from '@angular/core';
import {
	ReallyGlobalReactiveState,
	reallyGlobalReactiveState,
} from '../really-global-reactive-state';

@Component({
	selector: 'app-derived-state',
	imports: [],
	template: `
		<div>
			Derived State Counter {{ derivedCounter().counter }}
			<button (click)="incrementDerivedCounter()">Increment!</button>
		</div>
	`,
	styleUrl: './derived-state.component.scss',
})
export class DerivedStateComponent {
	readonly derivedCounter = linkedSignal<
		ReallyGlobalReactiveState,
		ReallyGlobalReactiveState
	>({
		source: reallyGlobalReactiveState,
		computation: (source, previous) => {
			return {
				counter:
					(previous?.value.counter ?? 0) +
					source.counter -
					(previous?.source.counter ?? 0),
				currentRoute: source.currentRoute,
			};
		},
	});

	incrementDerivedCounter() {
		this.derivedCounter.update((state) => ({
			...state,
			counter: state.counter + 1,
		}));
	}
}
