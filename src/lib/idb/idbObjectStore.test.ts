import { describe, it, expect } from 'vitest';
import * as _ from 'fake-indexeddb/auto';
import IdbObjectStore from './idbObjectStore';

const openIdb = (name: string, version: number): Promise<IDBDatabase> => {
	return new Promise((resolve, reject) => {
		const request = indexedDB.open(name, version);

		request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
			const db = request.result;
			if (db) {
				db.createObjectStore('testObjectStore', { autoIncrement: true });
			}
		};

		request.onsuccess = () => {
			resolve(request.result);
		};

		request.onerror = () => {
			reject(request.error);
		};
	});
};

// TODO: isolate unit test from each other
describe('IdbObjectStore', async () => {
	const idb = await openIdb('test', 1);

	it('should add a value without key', async () => {
		const store = new IdbObjectStore(idb, 'testObjectStore', 'readwrite');
		const key = await store.add('first');
		expect(key).toBe(1);
		expect(await store.get(1)).toBe('first');
	});

	it('should add a value with a key', async () => {
		const store = new IdbObjectStore(idb, 'testObjectStore', 'readwrite');
		const key = await store.add('value', 'key');
		expect(key).toBe('key');
		expect(await store.get('key')).toBe('value');
	});

	it('should put a value without key', async () => {
		const store = new IdbObjectStore(idb, 'testObjectStore', 'readwrite');
		const key = await store.put('foo');
		expect(key).toBe(2);
		expect(await store.get(2)).toBe('foo');
	});

	it('should put a value with a key', async () => {
		const store = new IdbObjectStore(idb, 'testObjectStore', 'readwrite');
		const key = await store.put('bar', 2);
		expect(key).toBe(2);
		expect(await store.get(2)).toBe('bar');
	});

	it('should get a value', async () => {
		const store = new IdbObjectStore(idb, 'testObjectStore', 'readwrite');
		expect(await store.get(2)).toBe('bar');
	});

	it('should get all values', async () => {
		const store = new IdbObjectStore(idb, 'testObjectStore', 'readwrite');
		const values = await store.getAll();
		expect(values).toEqual(['first', 'bar', 'value']);
	});

	it('should delete a value', async () => {
		const store = new IdbObjectStore(idb, 'testObjectStore', 'readwrite');
		await store.delete(2);
		expect(await store.get(2)).toBe(undefined);
		expect(await store.getAll()).toEqual(['first', 'value']);
	});
});
