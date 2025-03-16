import {
	ChangeDetectionStrategy,
	Component,
	DestroyRef,
	inject,
	signal,
	Signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { filter, interval } from 'rxjs';
import { InjectionToken } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';

export interface AppConfig {
	currentUrl: Signal<string>;
}

export interface BrowserInfo {
	browser: string;
	os: string;
}

//  used for #3
export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');

// used for #4
export const BROWSER_INFO = new InjectionToken<BrowserInfo>('browser.info', {
	providedIn: 'root',
	factory: () => {
		// #4
		const aDocument = inject(DOCUMENT);
		const userAgent = aDocument.defaultView?.navigator.userAgent;
		const platform = aDocument.defaultView?.navigator.platform.toLowerCase();

		let browser = 'Unknown';
		let os = 'Unknown';

		if (!userAgent) {
			/** NOOP */
		} else if (/edg/i.test(userAgent)) {
			browser = 'Edge';
		} else if (/chrome/i.test(userAgent)) {
			browser = 'Chrome';
		} else if (/safari/i.test(userAgent)) {
			browser = 'Safari';
		} else if (/firefox/i.test(userAgent)) {
			browser = 'Firefox';
		} else if (/msie|trident/i.test(userAgent)) {
			browser = 'Internet Explorer';
		}

		if (!userAgent || !platform) {
			/** NOOP */
		} else if (platform.indexOf('win') > -1) {
			os = 'Windows';
		} else if (platform.indexOf('mac') > -1) {
			os = 'MacOS';
		} else if (/android/.test(userAgent.toLowerCase())) {
			os = 'Android';
		} else if (/iphone|ipad|ipod/.test(userAgent.toLowerCase())) {
			os = 'iOS';
		} else if (platform.indexOf('linux') > -1) {
			os = 'Linux';
		}
		return {
			browser,
			os,
		};
	},
});

// used for #5
const reallyCrapyExampleOfStackframe = (
	appConfig = inject(APP_CONFIG),
	browserInfo = inject(BROWSER_INFO)
) => {
	return {
		appConfig,
		browserInfo,
	};
};

@Component({
	selector: 'app-inject-function',
	imports: [ReactiveFormsModule],
	providers: [
		{
			provide: APP_CONFIG,
			useFactory: () => {
				const currentUrl = signal('');
				// #3 example
				const destroyRef = inject(DestroyRef);
				// #3 example
				inject(Router)
					.events.pipe(
						filter((event) => event instanceof NavigationEnd),
						takeUntilDestroyed(destroyRef)
					)
					.subscribe((event) => {
						currentUrl.set(`${event.urlAfterRedirects}`);
					});
				return {
					currentUrl: currentUrl.asReadonly(),
				};
			},
		},
	],
	template: `
		<h1>{{ title() }}</h1>
		<h2>Hello from {{ name }}!</h2>
		<a target="_blank" href="https://angular.dev/overview">
			Learn more about Angular
		</a>
		<div>
			Current url => <strong>{{ numberFive.appConfig.currentUrl() }}</strong>
		</div>
		<div>
			Browser => <strong>{{ numberFive.browserInfo.browser }}</strong>
		</div>
		<div>
			OS => <strong>{{ anotherNumberFive.browserInfo.os }}</strong>
		</div>
		<div>Current Time => <input [formControl]="randomControl" /></div>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InjectFunctionComponent {
	name = 'Angular';

	// #2 example
	titleService = inject(Title, { optional: true });
	// #2 another example using the injection directly
	randomControl = inject(FormBuilder).control(new Date().toLocaleString());
	// yes this is super interesting
	numberFive = (() => ({
		// #5
		...reallyCrapyExampleOfStackframe(),
	}))();
	anotherNumberFive = reallyCrapyExampleOfStackframe();

	title: Signal<string>;

	constructor() {
		// #1 example
		const destroyRef = inject(DestroyRef);
		this.randomControl.disable();
		interval(1000)
			.pipe(takeUntilDestroyed(destroyRef))
			.subscribe(() => {
				const now = new Date().toLocaleString();
				this.randomControl.setValue(now);
			});
		this.title = signal(this.titleService?.getTitle() ?? '');
	}
}
