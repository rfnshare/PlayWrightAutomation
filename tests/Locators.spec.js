import {test, expect} from '@playwright/test'

test('PlayWright Special Locators', async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByPlaceholder("Password").fill("hello");
    await page.getByRole("button", {name: 'Submit'}).click();
    console.log(await page.getByText("The Form has been submitted successfully!.").isVisible());
    await page.getByRole("link", {name: 'Shop'}).click();
    await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click();
    await page.pause();
})