import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { reallyGlobalReactiveState } from './app/examples/really-global-state/really-global-state';

const bootstrap = () => {
	return bootstrapApplication(AppComponent, config)
		.then((appRef) => {
			console.log('Application bootstrapped successfully');
			if (!appRef) return;
			const router = appRef.injector.get(Router);
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

export default bootstrap;
