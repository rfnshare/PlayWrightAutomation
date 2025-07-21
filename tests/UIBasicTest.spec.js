// const {test} = require('@playwright/test');
import { expect, test } from '@playwright/test';

test('First PlayWright Test Using Context', async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://example.com/');
    console.log(await page.title());

});

test('First PlayWright Test Using Page', async ({page})=>
{
    await page.goto('https://google.com');
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");
});