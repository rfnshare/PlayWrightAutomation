import { test, expect } from "@playwright/test";

test.only("E2E Test", async ({ page }) => {
  // Domain URL
  const domainURL = "https://rahulshettyacademy.com/client";

  // Sign Up Information
  const randomNumber = Math.floor(Math.random() * 1000000);
  const email = `testuser${randomNumber}@example.com`;
  const firstName = "Abdullah Al";
  const lastName = "Faroque";
  const userMobile = "1111111111";
  const userPassword = "Rfns@0000";
  const userConfirmPassword = userPassword;

  // Product Information
  const productName = "ADIDAS ORIGINAL";

  // Sign Up Locators
  const regBtnLoc = page.locator(".text-reset");
  const firstNameLoc = page.locator("#firstName");
  const lastNameLoc = page.locator("#lastName");
  const regUserEmailLoc = page.locator("#userEmail");
  const userMobileLoc = page.locator("#userMobile");
  const regUserPasswordLoc = page.locator("#userPassword");
  const confirmPasswordLoc = page.locator("#confirmPassword");
  const checkboxLoc = page.locator('[type="checkbox"]');

  // Sign In Locators
  const userEmailLoc = page.locator("#userEmail");
  const userPasswordLoc = page.locator("#userPassword");

  // Common Locators
  const confirmBtnLoc = page.locator('[type="submit"]');

  // Product Page Locators
  const productCardBody = page.locator(".card-body");
  const cartBtn = page.locator("button[routerlink='/dashboard/cart']");

  // Cart Page Locators
  const cartPageProductNameLoc = page.locator(".cartSection h3");

  // ------------------Sign Up Flow-------------------------
  await page.goto(domainURL);
  await regBtnLoc.click();
  await firstNameLoc.fill(firstName);
  await lastNameLoc.fill(lastName);
  await regUserEmailLoc.fill(email);
  await userMobileLoc.fill(userMobile);
  await regUserPasswordLoc.fill(userPassword);
  await confirmPasswordLoc.fill(userConfirmPassword);
  await checkboxLoc.click();
  await confirmBtnLoc.click();

  // ------------------Validate Sign Up-------------------------
  await expect(page.locator("[class='headcolor']")).toContainText(
    "Successfully"
  );
  await page.locator("[routerlink='/auth']").click();

  // ------------------Sign In Flow-------------------------
  await userEmailLoc.fill(email);
  await userPasswordLoc.fill(userPassword);
  await confirmBtnLoc.click();

  // ------------------Validate Sign In-------------------------
  await page.locator("[class='card-body'] b").first().waitFor(); // element level wait
  await expect(page.locator("[class='card-body'] b").first()).toBeVisible();
  console.log("\n===============================");
  console.log("✅ Test User Created:");
  console.log(`📧 Email    : ${email}`);
  console.log(`🔐 Password : ${userPassword}`);
  console.log("===============================\n");

  // ------------------Add To Cart Flow-------------------------
  const productCount = await productCardBody.count();
  console.log(`✅ Product Count: ${productCount}`);
  for (let i=0; i<productCount; ++i)
  {
    const productTitle = await productCardBody.nth(i).locator("h5").textContent();
    if (productTitle==productName)
    {
        await productCardBody.nth(i).locator("button[class='btn w-10 rounded']").click();
        break;
    }
  }
  await cartBtn.click();
  
  // ------------------Cart Page Flow-------------------------
  const cartPageProductName = await cartPageProductNameLoc.textContent();
  console.log(`🛒 Cart Page Product Name: ${cartPageProductName}`);
  expect(cartPageProductName.trim()).toBe(productName);
  // Validating Cart Page
  // await page.waitForLoadState('networkidle');
  await page.locator("li[class*=items]").waitFor();
  const bool = await page.locator(`h3:has-text("${productName}")`).isVisible();
  expect(bool).toBeTruthy();

  // ------------------Checkout Page Flow-------------------------
  await page.locator("button[type='button']").last().click(); // Click Checkout Button
  await page.locator("[placeholder='Select Country']").pressSequentially("Ban", {delay:100});
  const dropdown = page.locator("[class*='ta-results']");
  await dropdown.waitFor();
  for (let i=0; i<await dropdown.locator("button").count(); ++i)
  {
    const nameOfCountry = await dropdown.locator("button").nth(i).textContent();
    console.log(`🧾 Country Name: ->${nameOfCountry}<-`);
    if (nameOfCountry.trim()=="Bangladesh")
    {
      await dropdown.locator("button").nth(i).click();
      break;
    }
  }
  await page.pause();
});
