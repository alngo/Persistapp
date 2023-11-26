import { describe, expect, it } from 'vitest';
import SessionStorageBox from './sessionStorageBox';

describe('LocalStorageBox', () => {
	it('should be able to add and get a value', () => {
		const box = new SessionStorageBox('test');
		box.add('foo');
		expect(box.get()).toBe('foo');
	});

	it('should be able to put and get a value', () => {
		const box = new SessionStorageBox('test');
		box.put('bar');
		expect(box.get()).toBe('bar');
	});

	it('should be able to del a value', () => {
		const box = new SessionStorageBox('test');
		box.put('bar');
		expect(box.get()).toBe('bar');
		box.del('bar');
		expect(box.get()).toBe(null);
	});
});
