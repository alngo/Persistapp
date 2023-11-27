import type { StorageBox } from '../storageBox';
import type { IDBPObjectStore } from 'idb';

export default class IdbStorageBox<T> implements StorageBox<T> {
	private objectStore: IDBPObjectStore;

	constructor(objectStore: IDBPObjectStore) {
		this.objectStore = objectStore;
	}

	public add = async (value: T) => {
		await this.objectStore.add(value);
		return await this.get();
	};

	public put = (value: any) => {
		return value;
	};

	public get = async (): T | null => {
		return await this.objectStore.getAll();
	};

	public del = (_: any) => {
		return [];
	};
}

// import { openDB } from 'idb';
//
// const dbPromise = openDB('keyval-store', 1, {
//   upgrade(db) {
//     db.createObjectStore('keyval');
//   },
// });
//
// export async function get(key) {
//   return (await dbPromise).get('keyval', key);
// }
// export async function set(key, val) {
//   return (await dbPromise).put('keyval', val, key);
// }
// export async function del(key) {
//   return (await dbPromise).delete('keyval', key);
// }
// export async function clear() {
//   return (await dbPromise).clear('keyval');
// }
// export async function keys() {
//   return (await dbPromise).getAllKeys('keyval');
// }
