import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import Persistable from './Persistable.svelte';

describe('Persistable', () => {
	it('should render with 0', () => {
		const { getByText } = render(Persistable);
		expect(getByText('0')).toBeTruthy();
	});

	it('should increment to 1', () => {
		const { getByText } = render(Persistable);
		expect(getByText('0')).toBeTruthy();
		getByText('increment').click();
		expect(getByText('1')).toBeTruthy();
	});
});
