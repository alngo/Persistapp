import { writable, type Writable } from 'svelte/store';

interface Persistable<T> extends Writable<T> {}

export function persistable<T>(initialValue: T): Persistable<T> {
	const store = writable(initialValue);
	return store;
}
