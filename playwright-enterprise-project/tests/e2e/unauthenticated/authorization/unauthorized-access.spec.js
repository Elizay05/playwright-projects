import { test, expect } from '@playwright/test';
import { AUTH_ERRORS } from '../../../../test-data/errors';
import { PATHS, PROTECTED_ROUTES } from '../../../../test-data/paths';
import { TAGS } from '../../../../test-data/tags';

test.describe('Unauthorized access protection',
  () => {
    for (const route of PROTECTED_ROUTES) {
      test(
        `${TAGS.REGRESSION} User cannot access ${route.page} without login`,
        async ({ page }) => {
          await page.goto(route.path);

          const error = page.locator('[data-test="error"]');

          await expect(error).toBeVisible();
          await expect(error).toHaveText(
            AUTH_ERRORS.UNAUTHORIZED(route.path)
          );

          await expect(page).toHaveURL(PATHS.LOGIN);
        }
      );
    }
  }
);