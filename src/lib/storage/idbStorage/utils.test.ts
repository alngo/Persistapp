import { afterEach, describe, expect, it } from 'vitest';
import * as _ from 'fake-indexeddb/auto';
import { openIdb, openIdbStore, promise } from './utils';

describe('utils', () => {
	afterEach(() => {
		window.indexedDB.deleteDatabase('test');
	});

	it('should be able to open an indexedDB', async () => {
		const db = await openIdb(
			'test',
			1,
			(event: Event) => {
				const db = (event.target as IDBOpenDBRequest).result;
				db.createObjectStore('test');
			},
			(event: Event) => {
				console.log('blocked');
			}
		);
		expect(db).toBeDefined();
		expect(db.objectStoreNames.contains('test')).toBe(true);
	});

	it('should be able to open an indexedDB store', async () => {
		const db = await openIdb(
			'test',
			1,
			(event: Event) => {
				const db = (event.target as IDBOpenDBRequest).result;
				db.createObjectStore('test');
			},
			(event: Event) => {
				console.log('blocked');
			}
		);
		const store = await openIdbStore(db, 'test', (event: Event) => {
			console.log('abort');
		});
		expect(store).toBeDefined();
	});

	it('should be able to return a promise from an IDBRequest', async () => {
		const db = await openIdb(
			'test',
			1,
			(event: Event) => {
				const db = (event.target as IDBOpenDBRequest).result;
				db.createObjectStore('test');
			},
			(event: Event) => {
				console.log('blocked');
			}
		);
		const store = await openIdbStore(db, 'test', (event: Event) => {
			console.log('abort');
		});
		const result = await promise(store.add(1));
		expect(result).toBe(1);
		indexedDB.deleteDatabase('test');
	});
});
