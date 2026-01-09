import { test, expect } from '@playwright/test';

test('test web table', async ({ page }) => {
    await page.goto('https://cosmocode.io/automation-practice-webtable/');

    const tableContainer = page.locator("xpath=//table[@id='countries']");
    const tableRows = await tableContainer.locator("xpath=.//tr").all();

    const countries = [];

    for (const row of tableRows) {
        const country = {
            name: await row.locator("xpath=.//td[2]").innerText(),
            capital: await row.locator("xpath=.//td[3]").innerText(),
            currency: await row.locator("xpath=.//td[4]").innerText(),
            primaryLanguage: await row.locator("xpath=.//td[5]").innerText()
        };

        countries.push(country);
    }

    /*for (const country of countries){
        console.log(country);
    }*/

    const countryWherePeopleSpeakPortuguese = countries.filter(country => country.primaryLanguage === 'Portuguese');
    console.log('Country where people speak Portuguese:', countryWherePeopleSpeakPortuguese);
});
