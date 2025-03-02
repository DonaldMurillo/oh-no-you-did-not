import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { reallyGlobalReactiveState } from './app/examples/state/really-global-reactive-state';
import { DOCUMENT } from '@angular/common';

const bootstrap = () => {
	return bootstrapApplication(AppComponent, appConfig)
		.then((appRef) => {
			console.log('Application bootstrapped successfully');
			if (!appRef) return;
			// app ref to get injector
			const router = appRef.injector.get(Router);
			// get the window object from the document
			const defaultView = appRef.injector.get(DOCUMENT).defaultView;
			if (defaultView) {
				// attach the global variable to the window object
				(defaultView as any).reallyGlobalReactiveState =
					reallyGlobalReactiveState;
			}
			// initialize state with the current route
			reallyGlobalReactiveState.update((state) => ({
				...state,
				currentRoute: router.url ?? '/',
			}));
			// subscribe to router events to update the state with the current route
			const sub = router.events
				.pipe(filter((event) => event instanceof NavigationEnd))
				.subscribe((event) => {
					reallyGlobalReactiveState.update((state) => ({
						...state,
						currentRoute: event.urlAfterRedirects,
					}));
				});
			appRef.onDestroy(() => {
				sub.unsubscribe();
			});
			return appRef;
		})
		.catch((err) => console.error(err));
};

bootstrap();
