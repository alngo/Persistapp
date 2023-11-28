import type { StorageBox } from '../storageBox';
import IdbObjectStore from '$lib/idb/idbObjectStore.ts';

export default class IdbStorageBox<T> implements StorageBox<T> {
	private idbObjStore: IdbObjectStore;

	constructor(idbObjStore: IdbObjectStore) {
		this.idbObjStore = idbObjStore;
	}

	public loadData = async () => {
		const keys = await this.idbObjStore.getAllKeys();
		const values = await this.idbObjStore.getAll();
	};

	public add = (value: any, key?: any) => {
		return value;
	};

	public put = (value: any, key?: any) => {
		return value;
	};

	public get = (key?: any): T => {
		return '';
	};

	public del = (key?: any) => {
		return [];
	};
}
