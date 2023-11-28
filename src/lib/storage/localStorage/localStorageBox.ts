import type { StorageBox } from '../storageBox.ts';

export default class LocalStorageBox implements StorageBox<string> {
	private key: string;

	constructor(key: string) {
		this.key = key;
	}

	public setCallback = () => {};

	public add = (value: any) => {
		this.put(value);
		return value;
	};

	public put = (value: any) => {
		localStorage.setItem(this.key, JSON.stringify(value));
		return value;
	};

	public get = (): string => {
		const value = localStorage.getItem(this.key);
		return value ? JSON.parse(value) : '';
	};

	public del = () => {
		localStorage.removeItem(this.key);
		return '';
	};
}
