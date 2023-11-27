import type { StorageBox } from '../storageBox.ts';

export default class LocalStorageBox implements StorageBox<string> {
	private key: string;

	constructor(key: string) {
		this.key = key;
	}

	public add = (value: any) => {
		this.put(value);
		return value;
	};

	public put = (value: any) => {
		localStorage.setItem(this.key, JSON.stringify(value));
		return value;
	};

	public get = (): string | null => {
		const value = localStorage.getItem(this.key);
		return value ? JSON.parse(value) : value;
	};

	public del = (_: any) => {
		localStorage.removeItem(this.key);
		return '';
	};
}
