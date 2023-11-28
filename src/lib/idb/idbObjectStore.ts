export default class IdbObjectStore {
	private idb: IDBDatabase;
	private name: string;
	private mode: IDBTransactionMode;

	constructor(idb: IDBDatabase, name: string, mode: IDBTransactionMode) {
		this.idb = idb;
		this.name = name;
		this.mode = mode;
	}

	private openTransaction = (): IDBObjectStore => {
		const transaction = this.idb.transaction(this.name, this.mode);
		const objectStore = transaction.objectStore(this.name);
		return objectStore;
	};

	public add = (value: any, key?: IDBValidKey): Promise<IDBValidKey> => {
		return new Promise((resolve, reject) => {
			const request = this.openTransaction().add(value, key);
			request.onsuccess = () => {
				resolve(request.result);
			};
			request.onerror = () => {
				reject(request.error);
			};
		});
	};

	public put = (value: any, key?: IDBValidKey): Promise<IDBValidKey> => {
		return new Promise((resolve, reject) => {
			const request = this.openTransaction().put(value, key);
			request.onsuccess = () => {
				resolve(request.result);
			};
			request.onerror = () => {
				reject(request.error);
			};
		});
	};

	public get = (key: IDBValidKey) => {
		return new Promise((resolve, reject) => {
			const request = this.openTransaction().get(key);
			request.onsuccess = () => {
				resolve(request.result);
			};
			request.onerror = () => {
				reject(request.error);
			};
		});
	};

	public getAllKeys = () => {
		return new Promise((resolve, reject) => {
			const request = this.openTransaction().getAllKeys();
			request.onsuccess = () => {
				resolve(request.result);
			};
			request.onerror = () => {
				reject(request.error);
			};
		});
	};

	public getAll = () => {
		return new Promise((resolve, reject) => {
			const request = this.openTransaction().getAll();
			request.onsuccess = () => {
				resolve(request.result);
			};
			request.onerror = () => {
				reject(request.error);
			};
		});
	};

	public getAllWithKeys = (): Promise<Map<IDBValidKey, any>> => {
		return new Promise((resolve, reject) => {
			const map = new Map();
			const request = this.openTransaction().openCursor();
			request.onsuccess = () => {
				let cursor = request.result;
				if (cursor) {
					let key = cursor.primaryKey;
					let value = cursor.value;
					map.set(key, value);
					cursor.continue();
				} else {
					resolve(map);
				}
			};
			request.onerror = () => {
				reject(request.error);
			};
		});
	};

	public delete = (key: IDBValidKey) => {
		return new Promise((resolve, reject) => {
			const request = this.openTransaction().delete(key);
			request.onsuccess = () => {
				resolve(request.result);
			};
			request.onerror = () => {
				reject(request.error);
			};
		});
	};
}
