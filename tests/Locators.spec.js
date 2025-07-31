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

test.only('PlayWright Locator Handle Two', async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/");
    await page.locator("[class='product']").filter({hasText: 'Cucumber - 1 Kg'}).getByRole("button").click();
    await page.locator("[class='cart-icon']").click();
    await page.getByRole("button", {name: 'PROCEED TO CHECKOUT'}).click();
    await page.getByRole("button", {name: 'Place Order'}).click();
    await page.getByRole("combobox").selectOption("Bangladesh");
    await page.getByRole("checkbox").click();
    await page.getByRole("button").click();
    await page.pause();


})