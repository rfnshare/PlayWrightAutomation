// const {test} = require('@playwright/test');
import { test } from '@playwright/test';

test('First PlayWright Test Using Context', async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://example.com/');

});

test.only('First PlayWright Test Using Page', async ({page})=>
{
    await page.goto('https://google.com');
});