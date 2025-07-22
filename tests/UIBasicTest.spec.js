// const {test} = require('@playwright/test');
import { expect, test } from '@playwright/test';

test.only('First PlayWright Test Using Context', async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());
    await page.locator('#username').fill("");
    await page.locator("[type='password']").fill("learning");
    await page.locator('#signInBtn').click();
    // console.log(await page.locator("[class*=alert]").textContent());
    await expect(page.locator("[class*=alert]")).toContainText("Incorrect");
    // await page.waitForTimeout(5000);


});

test('First PlayWright Test Using Page', async ({page})=>
{
    await page.goto('https://google.com');
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");
});