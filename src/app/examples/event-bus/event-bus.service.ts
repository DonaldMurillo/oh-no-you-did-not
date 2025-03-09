/**
 * @fileoverview This file implements the Event Bus pattern in Angular using RxJS.
 * The Event Bus pattern provides a centralized event handling system that allows
 * decoupled components to communicate with each other through events.
 */

import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

/**
 * Interface representing the structure of events that flow through the event bus.
 * @template T - The type of the payload data
 */
interface EventBusEvent<T extends any> {
	/** Unique identifier for the event type */
	type: string;
	/** Data associated with the event */
	payload: T;
}

/**
 * Angular service implementing the Event Bus pattern.
 *
 * @description
 * The Event Bus service provides a centralized communication mechanism using RxJS Subjects.
 * It allows different parts of the application to communicate without direct dependencies.
 *
 * Key benefits:
 * - Decoupled communication between components
 * - Type-safe event handling
 * - Centralized event management
 *
 * Example usage:
 * ```typescript
 * // In component A (emitting event)
 * this.eventBus.emit('userLoggedIn', { id: 123, name: 'John' });
 *
 * // In component B (listening to event)
 * this.eventBus.on<User>('userLoggedIn').subscribe(user => {
 *   console.log('User logged in:', user);
 * });
 * ```
 */
@Injectable({
	providedIn: 'root',
})
export class EventBusService {
	/** Central event bus implemented as an RxJS Subject */
	private readonly eventBus = new Subject<EventBusEvent<any>>();

	/**
	 * Emits an event with the specified type and payload to all subscribers.
	 * @template T - The type of the payload data
	 * @param type - The event type identifier
	 * @param payload - The data to be transmitted with the event
	 */
	emit<T>(type: string, payload: T): void {
		this.eventBus.next({ type, payload });
	}

	/**
	 * Subscribes to events of a specific type.
	 * @template T - The expected type of the payload data
	 * @param eventType - The event type to listen for
	 * @returns An Observable that emits only the payload of matching events
	 */
	on$<T>(eventType: string): Observable<T> {
		return this.eventBus.asObservable().pipe(
			filter((event: EventBusEvent<T>) => event.type === eventType),
			map((event: EventBusEvent<T>) => event.payload)
		);
	}
}
