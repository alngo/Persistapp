export const openIdb = (
	name: string,
	version: number,
	onupgradeneeded?: (event: Event) => void,
	onblocked?: (event: Event) => void
): Promise<IDBDatabase> => {
	return new Promise((resolve, reject) => {
		const request = indexedDB.open(name, version);
		request.onerror = (event: Event) => {
			reject(event);
		};
		request.onsuccess = (event: Event) => {
			resolve((event.target as IDBOpenDBRequest).result);
		};
		request.onupgradeneeded = (event: Event) => {
			if (onupgradeneeded) {
				onupgradeneeded(event);
			}
		};
		request.onblocked = (event: Event) => {
			if (onblocked) {
				onblocked(event);
			}
		};
	});
};

export const openIdbStore = (
	db: IDBDatabase,
	name: string,
	onabort?: (event: Event) => void
): Promise<IDBObjectStore> => {
	return new Promise((resolve, reject) => {
		const transaction = db.transaction(name, 'readwrite');
		transaction.onerror = (event: Event) => {
			reject(event);
		};
		transaction.oncomplete = (event: Event) => {
			resolve(transaction.objectStore(name));
		};
		transaction.onabort = (event: Event) => {
			if (onabort) {
				onabort(event);
			}
		};
	});
};

export const promise = <T>(idbRequest: IDBRequest): Promise<T> => {
	return new Promise((resolve, reject) => {
		idbRequest.onerror = (event: Event) => {
			reject(event);
		};
		idbRequest.onsuccess = (event: Event) => {
			resolve((event.target as IDBRequest).result);
		};
	});
};
