import { describe, it, expect } from 'vitest';
import * as _ from 'fake-indexeddb/auto';
import IdbStorageBox from './idbStorageBox';
import Idb from '$lib/idb/idb';

describe('idbStorageBox', async () => {
	const upgradeIdb = (event: IDBVersionChangeEvent) => {
		switch (event.oldVersion) {
			case 0:
			case 1:
				const db = (event.target as IDBOpenDBRequest).result;
				const tr = db.createObjectStore('testObjStore', { autoIncrement: true });
				break;
			default:
				break;
		}
	};
	const idb = new Idb('test', 1, upgradeIdb);
	await idb.open();
	const store = await idb.getIdbObjectStore('testObjStore', 'readwrite');

	it('should be able to add and get a value', () => {
		const storageBox = new IdbStorageBox<string>(store);
		storageBox.setCallback((value) => {
			expect(value).toEqual(new Map<IDBValidKey, string>([[1, 'foo']]));
			expect(storageBox.get(1)).toEqual('foo');
		});
		const map = storageBox.add('foo');
		expect(map.size).toEqual(1);
	});

	it('should be able to put and get a value', () => {
		const storageBox = new IdbStorageBox<string>(store);
		storageBox.setCallback((value) => {
			expect(value).toEqual(new Map<IDBValidKey, string>([[1, 'bar']]));
			expect(storageBox.get(1)).toEqual('bar');
		});
		const map = storageBox.put('bar', 1);
		expect(map.size).toEqual(1);
	});

	it('should be able to delete a value', () => {
		const storageBox = new IdbStorageBox<string>(store);
		storageBox.setCallback((value) => {
			expect(value).toEqual(new Map<IDBValidKey, string>());
			expect(storageBox.get(1)).toEqual(undefined);
		});
		const map = storageBox.del(1);
		expect(map.size).toEqual(0);
	});
});
