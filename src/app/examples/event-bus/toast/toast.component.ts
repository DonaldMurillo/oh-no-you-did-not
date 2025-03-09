import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
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
	animations: [
		trigger('toastAnimation', [
			transition(':enter', [
				style({ transform: 'translateY(100%)', opacity: 0 }),
				animate(
					'200ms ease-out',
					style({ transform: 'translateY(0)', opacity: 1 })
				),
			]),
			transition(':leave', [
				animate(
					'200ms ease-in',
					style({ transform: 'translateY(100%)', opacity: 0 })
				),
			]),
		]),
	],
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
			const message = messages[Math.floor(Math.random() * messages.length)];
			this.showToast(message);
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
		this.toasts.update((currentToasts) =>
			currentToasts.filter((t) => t.id !== id)
		);
	}
}
