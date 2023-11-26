import { expect, test } from '@playwright/test';

test('index page has expected h1', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByRole('heading', { name: 'Storages' })).toBeVisible();
});

test('it should save the value to local storage', async ({ page }) => {
	await page.goto('/');
	const button = page.getByRole('button', { name: 'increment' });
	await button.click();
	expect(page.getByText('1')).toBeTruthy();
	await page.reload();
	expect(page.getByText('1')).toBeTruthy();
});
