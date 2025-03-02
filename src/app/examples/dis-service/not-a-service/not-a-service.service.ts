import { computed, inject, linkedSignal } from '@angular/core';
import { Router } from '@angular/router';
import { RouteNames } from '../../../constants/route-names';
import {
	ReallyGlobalReactiveState,
	reallyGlobalReactiveState,
} from '../../state/really-global-reactive-state';

export const injectNotAService = () => {
	const router = inject(Router);

	const state = linkedSignal<
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

	// methods
	const navigateTo = (path: RouteNames) => {
		router.navigate([path]);
	};

	const getCurrentRoute = computed(() => {
		return state().currentRoute;
	});

	const goBack = () => {
		router.navigate(['..']);
	};

	const incrementCounter = () => {
		state.update((state) => ({ ...state, counter: state.counter + 1 }));
	};

	const getCounter = computed(() => {
		return state().counter;
	});

	return {
		navigateTo,
		getCurrentRoute,
		goBack,
		incrementCounter,
		getCounter,
	};
};
