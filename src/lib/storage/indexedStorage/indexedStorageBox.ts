import type { StorageBox } from '../storageBox';

export default class IndexedStorageBox<T> implements StorageBox<T> {
	private objectStore: IDBObjectStore;

	constructor(objectStore: IDBObjectStore) {
		this.objectStore = objectStore;
	}

	public add = (value: T) => {
		this.objectStore.add(value);
		return '';
	};

	public put = (value: any) => {
		return '';
	};

	public get = (): T | null => {
		return null;
	};

	public del = (_: any) => {
		return [];
	};
}
