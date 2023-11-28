export interface StorageBox<T> {
	add: (value: any, key?: any) => T;
	put: (value: any, key?: any) => T;
	get: (key?: any) => T;
	del: (key?: any) => T;
}
