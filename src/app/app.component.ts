import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderNavComponent } from './components/header-nav.component';
import { reallyGlobalReactiveState } from './examples/state/really-global-reactive-state';
import { ToastComponent } from './examples/event-bus/toast/toast.component';
import { EventBusService } from './examples/event-bus/event-bus.service';

@Component({
	selector: 'app-root',
	imports: [RouterOutlet, HeaderNavComponent, ToastComponent],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
})
export class AppComponent {
	private readonly eventBus = inject(EventBusService);

	reallyGlobalState = reallyGlobalReactiveState;
	title = 'oh-no-you-did-not';

	incrementCounter() {
		reallyGlobalReactiveState.update((state) => ({
			...state,
			counter: state.counter + 1,
		}));
	}

	/**
	 * Emit a random toast event.
	 */
	randomToast() {
		this.eventBus.emit('randomToast', undefined);
	}
}
