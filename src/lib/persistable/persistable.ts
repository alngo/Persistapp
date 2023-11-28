import { writable, type Readable } from 'svelte/store';
import type { StorageBox } from '$lib/storage/storageBox.ts';

interface Persistable<T> extends Readable<T> {
	add(value: T, key?: any): void;
	put(value: T, key?: any): void;
	del(key?: any): void;
}

export function persistable<T>(storage: StorageBox<T>, initialValue: T): Persistable<T> {
	const { subscribe, set } = writable(initialValue);

	const storedValue = storage.get();
	if (storedValue) {
		set(storedValue);
	}

	return {
		subscribe,
		add: (value: T, key?: any) => {
			const newValue = storage.add(value, key);
			set(newValue);
		},
		put: (value: T, key?: any) => {
			const newValue = storage.put(value, key);
			set(newValue);
		},
		del: (key?: any) => {
			const newValue = storage.del(key);
			set(newValue);
		}
	};
}
