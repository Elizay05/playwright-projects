import { test, expect } from '@playwright/test';
import { LoginPage } from './pageobjects/LoginPage';

test ('interceptor abort', async ({ page }) => {

    await page.on('request', request => {
        console.log(request.url())
    })
    await page.route(
        "**/*.{png,jpg,svg,jpeg}",
        router => router.abort()
    )

    await page.goto(process.env.BASE_URL)

    const loginPage = new LoginPage(page)
    await loginPage.loginWithCredentials('standard_user', 'secret_sauce')
    await loginPage.checkSuccessLogin()

    await page.screenshot({ path: 'screenshots/login.png', fullPage: true })
});

test ('interceptor custom', async ({ page }) => {
    await page.route(
        "https://demoqa.com/BookStore/v1/Books",
        router => {
            router.fulfill({
                status: 304,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: `
                {
                    "books": [
                        {
                            "isbn": "9781449325862",
                            "title": "Los amores de Sayira",
                            "subTitle": "A Working Introduction",
                            "author": "Richard E. Silverman",
                            "publish_date": "2020-06-04T08:48:39.000Z",
                            "publisher": "O'Reilly Media",
                            "pages": 500,
                            "description": "This pocket guide is the perfect on-the-job companion to Git, the distributed version control system. It provides a compact, readable introduction to Git for new users, as well as a reference to common commands and procedures for those of you with Git exp",
                            "website": "http://chimera.labs.oreilly.com/books/1230000000561/index.html"
                        }
                    ]
                }
                `
            })
        }
    )

    await page.goto("https://demoqa.com/books")
    await page.screenshot({ path: 'screenshots/books.png', fullPage: true })
});