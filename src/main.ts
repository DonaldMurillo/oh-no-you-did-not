import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { reallyGlobalReactiveState } from './app/examples/really-global-state/really-global-state';
import { DOCUMENT } from '@angular/common';

const bootstrap = () => {
	return bootstrapApplication(AppComponent, appConfig)
		.then((appRef) => {
			console.log('Application bootstrapped successfully');
			if (!appRef) return;
			const router = appRef.injector.get(Router);
			const defaultView = appRef.injector.get(DOCUMENT).defaultView;
			if (defaultView)
				(defaultView as any).reallyGlobalState = reallyGlobalReactiveState;
			reallyGlobalReactiveState.update((state) => ({
				...state,
				currentRoute: router.url ?? '/',
			}));
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
