export interface StorageBox<T> {
	add: (value: T) => void;
	put: (value: T) => void;
	get: () => T | null;
	del: (key: T) => void;
}
