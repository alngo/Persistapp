export interface StorageBox<T> {
	add: (value: T) => T;
	put: (value: T, key?: any) => T;
	get: (key?: any) => T | null;
	del: (key: T) => T;
}
