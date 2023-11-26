import { expect, test } from '@playwright/test';

test('index page has expected h1', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByRole('heading', { name: 'Hello' })).toBeVisible();
});

test('index page has an increment button', async ({ page }) => {
	await page.goto('/');
	const button = page.getByRole('button', { name: 'increment' });
	expect(button).toBeTruthy();
});

test('number should increment when button is clicked', async ({ page }) => {
	await page.goto('/');
	const button = page.getByRole('button', { name: 'increment' });

	expect(button).toBeTruthy();
	expect(page.getByText('0')).toBeTruthy();

	await button.click();
	expect(page.getByText('1')).toBeTruthy();
});

test('number should be consistent across routes', async ({ page }) => {
	await page.goto('/');
	const button = page.getByRole('button', { name: 'increment' });

	expect(button).toBeTruthy();
	expect(page.getByText('0')).toBeTruthy();

	await button.click();
	expect(page.getByText('1')).toBeTruthy();

	await page.goto('/subroute');
	expect(page.getByText('1')).toBeTruthy();

	const subButton = page.getByRole('button', { name: 'increment' });

	await subButton.click();
	expect(page.getByText('2')).toBeTruthy();

	await page.goto('/');
	expect(page.getByText('2')).toBeTruthy();
});

test('it should save the value to local storage', async ({ page }) => {
	await page.goto('/');
	const button = page.getByRole('button', { name: 'increment' });
	await button.click();
	expect(page.getByText('1')).toBeTruthy();
	await page.reload();
	expect(page.getByText('1')).toBeTruthy();
});
