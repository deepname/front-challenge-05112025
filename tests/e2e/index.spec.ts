import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';

const ARTICLE_CARD_SELECTOR = '.article-card';

function favoritesCounter(page: Page) {
  return page.getByRole('link', { name: /Favorites \(/i });
}

function favoriteToggleButton(page: Page, index = 0) {
  return page.locator(ARTICLE_CARD_SELECTOR).nth(index).locator('button');
}

async function ensureArticlesLoaded(page: Page) {
  await page.goto('/');
  const articles = page.locator(ARTICLE_CARD_SELECTOR);
  await expect.poll(async () => await articles.count(), { timeout: 30_000 }).toBeGreaterThan(0);
  return articles;
}

test.describe('News Browser E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage?.clear();
    });
  });

  test('waits for articles to load', async ({ page }) => {
    const articles = await ensureArticlesLoaded(page);
    await expect(page.getByRole('heading', { name: 'News Browser' })).toBeVisible();
    const articleCount = await articles.count();
    expect(articleCount).toBeGreaterThan(0);
  });

  test('allows toggling favorites from the list', async ({ page }) => {
    const articles = await ensureArticlesLoaded(page);
    const favoritesLink = favoritesCounter(page);

    await expect(favoritesLink).toHaveText(/Favorites \(0\)/);

    const selectionCount = 5;
    const totalArticles = await articles.count();
    expect(totalArticles).toBeGreaterThanOrEqual(selectionCount);

    for (let index = 0; index < selectionCount; index += 1) {
      await favoriteToggleButton(page, index).click();
    }

    await expect(favoritesLink).toHaveText(/Favorites \(5\)/);
  });

  test('navigates to favorites page showing only selected articles', async ({ page }) => {
    const articles = await ensureArticlesLoaded(page);
    const firstArticleTitle = (await articles.first().locator('h2').innerText()).trim();

    await favoriteToggleButton(page, 0).click();
    await expect(favoritesCounter(page)).toHaveText(/Favorites \(1\)/);

    await favoritesCounter(page).click();

    await expect(page).toHaveURL(/\/favorites$/);
    const favoriteArticles = page.locator(ARTICLE_CARD_SELECTOR);
    await expect
      .poll(async () => await favoriteArticles.count(), { timeout: 10_000 })
      .toBeGreaterThan(0);
    await expect(favoriteArticles).toHaveCount(1);
    await expect(favoriteArticles.first()).toContainText(firstArticleTitle);
    await expect(page.getByRole('heading', { name: 'Favorites' })).toBeVisible();
  });
});
