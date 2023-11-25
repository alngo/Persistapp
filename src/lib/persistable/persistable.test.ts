import { describe, it, expect } from 'vitest';
import { persistable } from '$lib/persistable/persistable';
import type {StorageBox} from '$lib/storage/storageBox';

describe('persistable test', () => {

    class MockStorageBox implements StorageBox {
        add(_: string) {}
        put(_: string) {}
        get(): string | null {
            return null;
        }
        del(_: string): void { }
    }

    const mockStorageBox = new MockStorageBox();

	it('should be a writable store', () => {
		const store = persistable(mockStorageBox, 0);
		expect(store.set).toBeDefined();
		expect(store.update).toBeDefined();
		expect(store.subscribe).toBeDefined();
	});
});
