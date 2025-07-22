// const {test} = require('@playwright/test');
import { expect, test } from '@playwright/test';

test('First PlayWright Test Using Context', async ({browser})=>
{


    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());
    const userName = page.locator('#username');
    const passWord = page.locator("[type='password']");
    const signIn = page.locator('#signInBtn');
    await userName.fill("rahulshetty");
    await passWord.fill("learning");
    await signIn.click();
    await expect(page.locator("[class*=alert]")).toContainText("Incorrect");

    await userName.fill("rahulshettyacademy");
    await passWord.fill("learning");
    await signIn.click();
    const product = page.locator("[class=card-title] a");
    // console.log(await product.first().textContent());
    // console.log(await product.nth(1).textContent());
    // console.log(await product.last().textContent());
    console.log(await product.allTextContents())
});

test('First PlayWright Test Using Page', async ({page})=>
{
    await page.goto('https://google.com');
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");
});

test("Third Playwright Test", async ({page})=>
{
   const randomNumber = Math.floor(Math.random()*1000000);
   const email = `testuser${randomNumber}@example.com`;
   await page.goto("https://rahulshettyacademy.com/client");
   const userEmail = page.locator("#userEmail");
   const userPassword = page.locator("#userPassword");
   const regBtn = page.locator(".text-reset");
   await regBtn.click();

   const firstName = page.locator("#firstName");
   const lastName = page.locator("#lastName");
   const regUserEmail = page.locator("#userEmail");
   const userMobile = page.locator("#userMobile");
   const regUserPassword = page.locator("#userPassword");
   const confirmPassword = page.locator("#confirmPassword");
   const checkbox = page.locator('[type="checkbox"]');
   const confirmBtn = page.locator('[type="submit"]');

   await firstName.fill("Abdullah Al");
   await lastName.fill("Faroque");
   await regUserEmail.fill(email);
   await userMobile.fill("1111111111");
   await regUserPassword.fill("Rfns@0000");
   await confirmPassword.fill("Rfns@0000");
   await checkbox.click();
   await confirmBtn.click();

   await expect(page.locator("[class='headcolor']")).toContainText("Successfully");
   await page.locator("[routerlink='/auth']").click();
   await userEmail.fill(email);
   await userPassword.fill("Rfns@0000");
   await confirmBtn.click();

   //console.log(await page.locator("[class='card-body'] b").first().textContent());
   //await page.waitForLoadState('networkidle'); // network level wait
   await page.locator("[class='card-body'] b").first().waitFor(); // element level wait
   console.log(await page.locator("[class='card-body'] b").allTextContents());
   console.log(email);
});

test('UI Control Testing', async ({page})=>
{
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());
    const userName = page.locator('#username');
    const passWord = page.locator("[type='password']");
    await userName.fill("rahulshettyacademy");
    await passWord.fill("learning");
    const dropdwon =  page.locator("select.form-control");
    await dropdwon.selectOption("consult");
    await page.locator("[class='checkmark']").last().click();
    await page.locator("#okayBtn").click();
    console.log(`Is Radio Button Clicked? ${await page.locator("[class='checkmark']").last().isChecked()}`);
    await expect(page.locator("[class='checkmark']").last()).toBeChecked();
    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    console.log(`Is terms checkbox checked? ${await page.locator("#terms").isChecked()}`);
    expect(await page.locator("#terms").isChecked()).toBeFalsy();
    const documentLocator = page.locator(".blinkingText");
    await expect(documentLocator).toHaveAttribute('class', 'blinkingText');
    // await page.pause();
    // await signIn.click();
});

test.only("Child Window", async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const documentLocator = page.locator(".blinkingText");
    const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    documentLocator.click(),
    ])
    const text = await newPage.locator(".red").textContent();
    const arrayText = text.split("@");
    const domain = arrayText[1].split(" ")[0];
    console.log(domain);
    expect(domain).toBe("rahulshettyacademy.com");
    await page.locator("#username").fill(domain);
    // await page.pause();
    const tt = await page.locator("#username").inputValue();
    console.log(`Hello, ${tt}`);
})