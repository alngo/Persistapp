export interface StorageBox {
	add: (value: any) => void;
	put: (value: any) => void;
	get: () => any;
	del: (key: any) => void;
}

export class LocalStorageBox implements StorageBox {
	private key: string;

	constructor(key: string) {
		this.key = key;
	}

	public add = (value: any) => {
		this.put(value);
	};

	public put = (value: any) => {
		localStorage.setItem(this.key, JSON.stringify(value));
	};

	public get = (): string | null => {
		const value = localStorage.getItem(this.key);
		return value ? JSON.parse(value) : value;
	};

	public del = (_: any) => {
		localStorage.removeItem(this.key);
	};
}
