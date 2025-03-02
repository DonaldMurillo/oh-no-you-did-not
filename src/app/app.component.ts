import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderNavComponent } from './components/header-nav.component';
import { reallyGlobalReactiveState } from './examples/state/really-global-reactive-state';

@Component({
	selector: 'app-root',
	imports: [RouterOutlet, HeaderNavComponent],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
})
export class AppComponent {
	reallyGlobalState = reallyGlobalReactiveState;
	title = 'oh-no-you-did-not';

	incrementCounter() {
		reallyGlobalReactiveState.update((state) => ({
			...state,
			counter: state.counter + 1,
		}));
	}
}
