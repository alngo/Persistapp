import { expect, test } from '@playwright/test';

test('index page has expected h1', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByRole('heading', { name: 'Hello' })).toBeVisible();
});

test('index page has an increment button', async ({ page }) => {
	await page.goto('/');
	const button = page.getByRole('button', { name: 'increment' });
	expect(button).toBeTruthy();
	expect(page.getByText('0')).toBeTruthy();
	await button.click();
	expect(page.getByText('1')).toBeTruthy();
});
