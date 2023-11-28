import { describe, it, expect } from 'vitest';
import { persistable } from '$lib/persistable/persistable';
import type { StorageBox } from '$lib/storage/storageBox';

describe('persistable test', () => {
	class MockStorageBox implements StorageBox<string> {
		add(_: string) {}
		put(_: string) {}
		get(): string | null {
			return null;
		}
		del(_: string): void {}
        setCallback(_: (value: string | null) => void): void {}
	}

	const mockStorageBox = new MockStorageBox();

	it('should be a writable store', () => {
		const store = persistable(mockStorageBox, 0);
		expect(store.add).toBeDefined();
		expect(store.put).toBeDefined();
		expect(store.del).toBeDefined();
		expect(store.subscribe).toBeDefined();
	});
});
