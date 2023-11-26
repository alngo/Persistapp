export interface StorageBox {
	add: (value: any) => void;
	put: (value: any) => void;
	get: () => any;
	del: (key: any) => void;
}
