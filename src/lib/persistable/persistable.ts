import { writable, type Readable } from 'svelte/store';
import type { StorageBox } from '$lib/storage/storageBox.ts';

interface Persistable<T> extends Readable<T> {
	add(value: T): void;
	put(value: T, key?: any): void;
	del(key: any): void;
}

export function persistable<T>(storage: StorageBox, initialValue: T, key?: any): Persistable<T> {
	const { subscribe, set, update } = writable(initialValue);

	const storedValue = storage.get();
	if (storedValue) {
		set(storedValue);
	}

	return {
		subscribe,
		add: (value: T) => {
			const newValue = storage.add(value);
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
