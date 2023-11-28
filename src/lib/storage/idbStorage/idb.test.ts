import { describe, it, expect } from 'vitest';
import * as _ from 'fake-indexeddb/auto';
import Idb from './idb';

describe('Idb', () => {
	const upgradeIdb = (event: IDBVersionChangeEvent) => {
		switch (event.oldVersion) {
			case 0:
			case 1:
				const db = (event.target as IDBOpenDBRequest).result;
				const tr = db.createObjectStore('testObjStore', { autoincrement: true });
				break;
			default:
				break;
		}
	};

	it('should open a database', async () => {
		const idb = new Idb('test', 1, upgradeIdb);
		const db = await idb.open();
		expect(db).toBeDefined();
		expect(idb.isOpen()).toBe(true);
	});

	it('should close a database', async () => {
		const idb = new Idb('test', 1, upgradeIdb);
		await idb.open();
		expect(idb.isOpen()).toBe(true);
		idb.close();
		expect(idb.isOpen()).toBe(false);
	});

	it('should open an object store', async () => {
		const idb = new Idb('test', 1, upgradeIdb);
		const db = await idb.open();
		const store = await idb.getIdbObjectStore('testObjStore');
		expect(store).toBeDefined();
	});
});
