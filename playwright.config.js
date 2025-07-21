// @ts-check
import { defineConfig, devices } from '@playwright/test';



/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  timeout: 40000,
  expect:
  {
    timeout: 40000
  },
  reporter: 'html',
  use: {
    browserName: 'webkit',
    headless: false
  }
});
module.exports = config

