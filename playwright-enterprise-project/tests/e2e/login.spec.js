import { test, expect } from '../../fixtures/test-fixtures';
import { LOGIN_SCENARIOS } from '../../test-data/loginScenarios';

for (const scenario of LOGIN_SCENARIOS) {
    test(scenario.title, async ({ loginPage, inventoryPage }) => {
        await loginPage.open();

        // This is intentionaly commented because https://sacedemo.com does not have a real backend API to test against.
        // The following is an example of how the login would look like if the API were accessible.
        /*
        const loginResponsePromise = page.waitForResponse(response =>
            response.url().includes('/login') &&
            response.request().method() === 'POST'
        );*/

        await loginPage.login(
            scenario.user.username,
            scenario.user.password
        );
        
        //const loginResponse = await loginResponsePromise;

        if (scenario.shouldLogin) {
            await inventoryPage.waitForPageLoad();
            //expect(loginResponse.status()).toBe(200);
            await expect(await inventoryPage.isVisible()).toBe(true);
        } else {
            //expect(loginResponse.status()).toBeGreaterThanOrEqual(400);
            const errorMessage = await loginPage.getErrorMessage();
            await expect(errorMessage).toContain(scenario.errorMessage);
        }
    });
}

test('Validate auth is working via storage state', async ({ inventoryPage }) => {
    await inventoryPage.open();

    await expect(await inventoryPage.isVisible()).toBe(true);
});