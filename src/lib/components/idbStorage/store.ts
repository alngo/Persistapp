import { persistable } from '$lib/persistable/persistable.ts';
import IdbStorageBox from '$lib/storage/idbStorage/idbStorageBox.ts';
import Idb from '$lib/idb/idb.ts';

const upgradeIdb = (event: IDBVersionChangeEvent) => {
	switch (event.oldVersion) {
		case 0:
		case 1:
			const db = (event.target as IDBOpenDBRequest).result;
			const tr = db.createObjectStore('persistable', { autoIncrement: true });
			break;
		default:
			break;
	}
};

const idb = new Idb('mydb', 1, upgradeIdb);
await idb.open();
const objStore = await idb.getIdbObjectStore('persistable', 'readwrite');
await objStore.put(0, 1);
const storageBox = new IdbStorageBox<number>(objStore);
await storageBox.loadData();

export const store = persistable(storageBox, new Map());
