import { test, expect } from '@playwright/test';
import testScenarios from '../testData.json';

test.describe('Asana Board Data-Driven Validation', () => {

  // Authenticate log-in before each test
  test.beforeEach(async ({ page }) => {

    // 1. Navigate to the login page
    await page.goto('https://create-asana-like-pr-39y5.bolt.host/');

    // 2. Fill out the login form
    await page.locator('#username').fill('admin');
    await page.locator('#password').fill('password123');

    // 3. Click the submit button
    await page.getByRole('button', { name: 'Sign in' }).click();

    // 4. Wait for the Logout button to be visible to confirm login
    await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();
  });

  // Loop through JSON objects for each test scenario
  for (const scenario of testScenarios) {
    
    test(`${scenario.id}: Verify "${scenario.taskName}" in ${scenario.appName} -> ${scenario.columnName}`, async ({ page }) => {
      
      // 1. Navigate to the application section based on appName field
      await page.getByRole('button', { name: new RegExp(scenario.appName) }).click();
      
      // 2. Validate that we are on the correct application section
      await expect(
        page.getByRole('heading', { level: 1, name: scenario.appName })
      ).toBeVisible();

      // 3. Locate the column container from the columnName field (RegExp used to bypass dynamic numbers like "(2)")
      const columnHeading = page.getByRole('heading', { level: 2, name: new RegExp(scenario.columnName) });
      const columnContainer = columnHeading.locator('..');

      // 4. Locate the task heading from the taskName field
      const taskHeading = columnContainer.getByRole('heading', { 
        level: 3, 
        name: scenario.taskName 
      });
      await expect(taskHeading).toBeVisible();

      // 5. Verify the tags for the task
      const taskCard = taskHeading.locator('..');
      for (const tag of scenario.tags) {
        await expect(taskCard.locator('span', { hasText: tag })).toBeVisible();
      }
      
    });
  }
});
