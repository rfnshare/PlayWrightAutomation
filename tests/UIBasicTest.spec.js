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

test.only("Third Playwright Test", async ({page})=>
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

   console.log(await page.locator("[class='card-body'] b").first().textContent());
   console.log(await page.locator("[class='card-body'] b").allTextContents());
   console.log(await email);
});