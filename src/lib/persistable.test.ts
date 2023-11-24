import { describe, it, expect } from 'vitest';
import { persistable } from '$lib/persistable';

describe('persistable test', () => {
	const sharedPersistable = persistable<number>(0);

	it('should be a writable store', () => {
		const store = persistable(0);
		expect(store.set).toBeDefined();
		expect(store.update).toBeDefined();
		expect(store.subscribe).toBeDefined();
	});
});
