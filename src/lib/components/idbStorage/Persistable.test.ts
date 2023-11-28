import { describe, it, expect } from 'vitest';
import * as _ from 'fake-indexeddb/auto';
import { render } from '@testing-library/svelte';
import Persistable from './Persistable.svelte';

describe('Persistable', () => {
	it('should render with 0', () => {
		const { getByText } = render(Persistable);
		expect(getByText('0')).toBeTruthy();
	});

	it('should increment from 0 to 1', () => {
		const { getByText } = render(Persistable);
		const button = getByText('increment');
		expect(getByText('0')).toBeTruthy();
		button.click();
		setTimeout(() => {
			expect(getByText('1')).toBeTruthy();
		}, 500);
	});

	it('should increment from 1 to 2', () => {
		const { getByText } = render(Persistable);
		const button = getByText('increment');
		expect(getByText('1')).toBeTruthy();
		button.click();
		setTimeout(() => {
			expect(getByText('2')).toBeTruthy();
		}, 500);
	});
});
