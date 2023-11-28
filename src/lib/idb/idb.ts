type UpgradeCallback = (event: IDBVersionChangeEvent) => void;
import IdbObjectStore from './idbObjectStore';

export default class Idb {
	private name: string;
	private version: number;
	private upgradeCallback: UpgradeCallback;
	private db?: IDBDatabase;

	constructor(name: string, version: number, upgradeCallback: UpgradeCallback) {
		this.name = name;
		this.version = version;
		this.upgradeCallback = upgradeCallback;
	}

	public open = (): Promise<IDBDatabase> => {
		return new Promise((resolve, reject) => {
			const request = indexedDB.open(this.name, this.version);

			request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
				this.upgradeCallback(event);
			};

			request.onsuccess = () => {
				this.db = request.result;
				resolve(this.db);
			};

			request.onerror = () => {
				reject(request.error);
			};
		});
	};

	public isOpen = (): boolean => {
		return this.db !== undefined;
	};

	public close = () => {
		this.db?.close();
		this.db = undefined;
	};

	public getIdbObjectStore = (
		name: string,
		mode: IDBTransactionMode = 'readonly'
	): Promise<IdbObjectStore> => {
		return new Promise((resolve, reject) => {
			if (this.db) {
				if (this.db.objectStoreNames.contains(name)) {
					resolve(new IdbObjectStore(this.db, name, mode));
				}
				reject(new Error(`Object store ${name} does not exist`));
			}
			reject(new Error('Database is not open'));
		});
	};
}
