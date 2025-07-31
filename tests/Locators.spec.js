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

test('PlayWright Locator Handle Two', async ({page})=>
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

test.only('PlayWright Calender Handle', async ({page})=>
{
    const year = "2027";
    const month = "June";
    const day = "9"
    const expectedList = ["6", day, year]
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator("button[class*='react-date-picker__calendar-button']").click(); 
    await page.locator("button[class*='react-calendar__navigation__label']").click();
    await page.locator("button[class*='react-calendar__navigation__label']").click();
    await page.getByText(`${year}`).click();
    await page.locator("button[class*='react-calendar__year-view__months__month']").nth("5").click();
    await page.locator(`[aria-label='${month} ${day}, ${year}']`).click();
    const inputs = page.locator("input[class*='react-date-picker__inputGroup__input']");
    for (let index=0; index <inputs.length; index++)
    {
        const value = await inputs.nth(index).getAttribute("value");
        expect(value).toBe(expectedList[index]);
    }
    await page.pause();


})