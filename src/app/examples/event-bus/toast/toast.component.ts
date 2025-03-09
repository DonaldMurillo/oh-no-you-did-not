import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventBusService } from '../event-bus.service';

interface Toast {
	id: number;
	message: string;
	type?: 'info' | 'success' | 'error' | 'warning';
}

@Component({
	selector: 'app-toast',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './toast.component.html',
	styleUrl: './toast.component.scss',
})
export class ToastComponent {
	private readonly toastIdCounter = signal(0);
	private readonly eventBus = inject(EventBusService);
	protected readonly toasts = signal<Toast[]>([]);

	constructor() {
		this.eventBus.on$<undefined>('randomToast').subscribe(() => {
			const messages = [
				'Hello, world!',
				'This is a toast message.',
				'You have mail!',
				'Something happened.',
			];
			const types: Toast['type'][] = ['info', 'success', 'error', 'warning'];
			const message = messages[Math.floor(Math.random() * messages.length)];
			const type = types[Math.floor(Math.random() * types.length)];
			this.showToast(message, type);
		});
	}

	showToast(message: string, type: Toast['type'] = 'info') {
		this.toastIdCounter.update((id) => id + 1);
		const toast: Toast = {
			id: this.toastIdCounter(),
			message,
			type,
		};

		this.toasts.update((currentToasts) => [...currentToasts, toast]);
		setTimeout(() => this.removeToast(toast.id), 5000);
	}

	removeToast(id: number) {
		const toastElement = document.querySelector(
			`.toast-item[data-id="${id}"]`
		);
		if (toastElement) {
			toastElement.classList.add('removing');
			setTimeout(() => {
				this.toasts.update((currentToasts) =>
					currentToasts.filter((t) => t.id !== id)
				);
			}, 200); // Match animation duration
		}
	}
}
