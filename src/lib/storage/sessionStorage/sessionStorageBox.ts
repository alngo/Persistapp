import type { StorageBox } from '../storageBox.ts';

export default class SessionStorageBox implements StorageBox {
	private key: string;

	constructor(key: string) {
		this.key = key;
	}

	public add = (value: any) => {
		this.put(value);
	};

	public put = (value: any) => {
		sessionStorage.setItem(this.key, JSON.stringify(value));
	};

	public get = (): string | null => {
		const value = sessionStorage.getItem(this.key);
		return value ? JSON.parse(value) : value;
	};

	public del = (_: any) => {
		sessionStorage.removeItem(this.key);
	};
}
