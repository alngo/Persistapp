import type { StorageBox } from '../storageBox';
import IdbObjectStore from '$lib/idb/idbObjectStore.ts';

export default class IdbStorageBox<T> implements StorageBox<Map<IDBValidKey, T>> {
	private idbObjStore: IdbObjectStore;
	private data: Map<IDBValidKey, any>;
	private callback?: (value: Map<IDBValidKey, T>) => void;

	constructor(idbObjStore: IdbObjectStore) {
		this.idbObjStore = idbObjStore;
		this.data = new Map<IDBValidKey, any>();
	}

	private loadData = async () => {
		this.data = await this.idbObjStore.getAllWithKeys().catch(() => new Map<IDBValidKey, any>());
	};

	public setCallback = (callback: (value: Map<IDBValidKey, T>) => void) => {
		this.callback = callback;
	};

	public add = (value: T, key?: IDBValidKey) => {
		const tmpKey = key || Date.now();
		this.data.set(tmpKey, value);
		this.idbObjStore
			.add(value, key)
			.then((idbKey) => {
				this.data.delete(tmpKey);
				this.data.set(idbKey, value);
			})
			.catch((error) => {
				console.error(error);
				this.data.delete(tmpKey);
			})
			.finally(() => {
				if (this.callback) {
					this.callback(this.data);
				}
			});
		return this.data;
	};

	public put = (value: T, key: IDBValidKey) => {
		const oldValue = this.data.get(key);
		this.data.set(key, value);
		this.idbObjStore
			.put(value, key)
			.catch((error) => {
				console.error(error);
				this.data.set(key, oldValue);
			})
			.finally(() => {
				if (this.callback) {
					this.callback(this.data);
				}
			});
		return this.data;
	};

	public get = (key?: IDBValidKey) => {
		if (key) {
			return this.data.get(key);
		}
		return this.data;
	};

	public del = (key: IDBValidKey) => {
		const oldValue = this.data.get(key);
		this.data.delete(key);
		this.idbObjStore
			.delete(key)
			.catch((error) => {
				console.error(error);
				this.data.set(key, oldValue);
			})
			.finally(() => {
				if (this.callback) {
					this.callback(this.data);
				}
			});
		return this.data;
	};
}
