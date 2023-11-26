import { writable, type Writable } from 'svelte/store';
import type { StorageBox } from '$lib/storage/storageBox.ts';

interface Persistable<T> extends Writable<T> {}

export function persistable<T>(storage: StorageBox, initialValue: T): Persistable<T> {
	const { subscribe, set, update } = writable(initialValue);

	const storedValue = storage.get();
	if (storedValue) {
		set(storedValue);
	}

	return {
		subscribe,
		set,
		update: (updater) => {
			update((value) => {
				const newValue = updater(value);
				storage.put(newValue);
				return newValue;
			});
		}
	};
}
