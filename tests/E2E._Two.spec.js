import { test, expect } from "@playwright/test";
import { exitCode } from "process";

test("E2E Test", async ({ page }) => {
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
  const userEmailLoc = page.getByPlaceholder("email@example.com");
  const userPasswordLoc = page.getByPlaceholder("enter your passsword");

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
  await page.pause();
  await page.locator("[class='card']").filter({hasText: `${productName}`}).getByRole("button", {name: 'Add To Cart'}).click();
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
  const country = "Bangladesh";
  await page.getByRole("button", {name: 'Checkout'}).click(); // Click Checkout Button
  await page.getByPlaceholder("Select Country").pressSequentially("Ban", { delay: 100 });
  await page.getByRole("button", {name: "Bangladesh"}).click();
  //
  const checkoutPageEmail = await page
    .locator("div[class*='user__name '] label")
    .textContent();
  expect(checkoutPageEmail).toBe(email);
  expect(page.locator("div[class*='user__name '] label")).toHaveText(email); //Another way to validate

  // ------------------Confirmed Order Page Flow-------------------------
  await page.getByText("PLACE ORDER").click();
  await page.getByText("THANKYOU FOR THE ORDER.").toBeVisible();
  const orderId = await page
    .locator("label[class='ng-star-inserted']")
    .textContent();
  const arrayOrder = orderId.trim().split(" ");
  const cleanOrderId = arrayOrder[1];
  console.log(`✔ Order Id: ${cleanOrderId}`);

  // ----------------- Order Page Flow-------------------------
  await page.locator("button[routerlink='/dashboard/myorders']").click();
  await page
    .locator(
      `//th[text()='${cleanOrderId}']/parent::tr//button[@class='btn btn-primary']`
    )
    .click();

  // Validating Order Contents
  const dashboardOrderId = await page
    .locator("[class='col-text -main']")
    .textContent();
  const BillinguserMailAndCountry = page.locator(
    "//div[@class='content-title' and contains(text(), 'Billing')]//parent::div//p"
  );
  const BillinguserMail = await BillinguserMailAndCountry.first().textContent();
  const BillinguserCountry = await BillinguserMailAndCountry.last().textContent();
  const DeiveryuserMailAndCountry = page.locator(
    "//div[@class='content-title' and contains(text(), 'Delivery')]//parent::div//p"
  );
  const DeiveryuserMail = await DeiveryuserMailAndCountry.first().textContent();
  const DeiveryuserCountry = await DeiveryuserMailAndCountry.last().textContent();
  const dashboardProductName = await page
    .locator("div[class='title']")
    .textContent();

  expect(dashboardOrderId).toBe(cleanOrderId);

  expect(BillinguserMail?.trim()).toBe(email);
  expect(BillinguserCountry).toContain(country);

  expect(DeiveryuserMail?.trim()).toBe(email);
  expect(DeiveryuserCountry).toContain(country);

  expect(dashboardProductName?.trim()).toBe(productName);
});
