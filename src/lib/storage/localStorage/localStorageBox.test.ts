import { describe, expect, it } from 'vitest';
import LocalStorageBox from './localStorageBox';

describe('LocalStorageBox', () => {
	it('should be able to add and get a value', () => {
		const box = new LocalStorageBox('test');
		box.add('foo');
		expect(box.get()).toBe('foo');
	});

	it('should be able to put and get a value', () => {
		const box = new LocalStorageBox('test');
		box.put('bar');
		expect(box.get()).toBe('bar');
	});

	it('should be able to del a value', () => {
		const box = new LocalStorageBox('test');
		box.put('bar');
		expect(box.get()).toBe('bar');
		box.del();
		expect(box.get()).toBe('');
	});
});
