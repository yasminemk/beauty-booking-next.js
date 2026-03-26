import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./test-suite/e2e",
  fullyParallel: false,
  workers: 1,
  retries: 0,
  outputDir: "./test-suite/test-results",
  reporter: [["list"], ["html", { outputFolder: "./test-suite/test-report", open: "never" }]],
  use: {
    baseURL: "http://localhost:3000",
    trace: "retain-on-failure",
    navigationTimeout: 30000,
  },
  webServer: {
    command: "npm run build && npm run start -- -p 3000",
    url: "http://localhost:3000",
    reuseExistingServer: true,
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});

// RESEND_API_KEY is not needed for tests because /api/contact is mocked at the browser level.
