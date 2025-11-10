import type { Locator, Page } from '@playwright/test';

export async function gotoStory(page: Page, storyId: string) {
  await page.goto(`/iframe.html?id=${storyId}&viewMode=story`);
  await page.waitForLoadState('networkidle');
  // Allow Storybook to settle fonts/transitions
  await page.waitForTimeout(100);
}

export function storyRoot(page: Page): Locator {
  return page.locator('#storybook-root, #root');
}
