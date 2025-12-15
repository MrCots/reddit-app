import { test, expect } from '@playwright/test';

/**
 * End-to-end test suite for the main application flow.
 */
test.describe('Reddit App E2E', () => {
  /**
   * Test case to verify that the application loads and displays posts.
   */
  test('should load the homepage and display posts', async ({ page }) => {
    // 1. Navigate to the application's base URL.
    await page.goto('/');

    // 2. Wait for the "Subreddits" panel to be visible, which indicates the layout has loaded.
    await expect(page.getByRole('heading', { name: 'Subreddits' })).toBeVisible();

    // 3. Assert that at least one post card is rendered on the page.
    // We use `first()` to ensure we don't wait for all of them, just that the list has started rendering.
    await expect(page.locator('.post-card').first()).toBeVisible();
  });

  /**
   * Test case to verify the search functionality.
   */
  test('should allow searching for a subreddit', async ({ page }) => {
    const searchTerm = 'reactjs';

    // 1. Navigate to the application.
    await page.goto('/');

    // 2. Find the search input, fill it with a search term, and click the search button.
    await page.getByPlaceholder(/search for a subreddit/i).fill(searchTerm);
    await page.getByRole('button', { name: 'Search' }).click();

    // 3. Assert that the main heading has updated to reflect the search.
    // We use a regular expression to make the check case-insensitive.
    const heading = page.getByRole('heading', { name: new RegExp(`Reddit /r/${searchTerm}`, 'i') });
    await expect(heading).toBeVisible();
  });

  /**
   * Test case to verify that clicking a post opens and closes the detail modal.
   */
  test('should open and close the post detail modal', async ({ page }) => {
    // 1. Navigate to the application.
    await page.goto('/');

    // 2. Wait for the first post card to be visible and then click it.
    await expect(page.locator('.post-card').first()).toBeVisible();
    await page.locator('.post-card').first().click();

    // 3. Assert that the modal overlay is now visible.
    await expect(page.locator('.modal-overlay')).toBeVisible();

    // 4. Assert that the comments section is visible within the modal.
    await expect(page.getByRole('heading', { name: 'Comments' })).toBeVisible();

    // 5. Click the close button.
    await page.locator('.modal-close-button').click();

    // 6. Assert that the modal overlay is no longer visible.
    await expect(page.locator('.modal-overlay')).not.toBeVisible();
  });
});
