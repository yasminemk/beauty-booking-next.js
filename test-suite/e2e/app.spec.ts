/**
 * E2E tests for critical user journeys.
 * API routes are mocked, no real credentials or network calls are needed.
 *
 * Tests:
 * 1. Home page loads and Book Now CTA navigates to /book
 * 2. Contact form shows validation errors on empty submit,
 *    and shows success message after a valid mocked submission
 */

import { test, expect } from "@playwright/test";

test("Home page loads and Book Now CTA navigates to /book", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

  await page.getByTestId("primary-book-cta").click();
  await expect(page).toHaveURL(/\/book$/);
});

test("Contact form validates empty submit and shows success after mocked submission", async ({ page }) => {
  await page.goto("/contact", { waitUntil: "domcontentloaded" });

  await page.getByRole("button", { name: /send message/i }).click();
  await expect(page.getByText("Name is required.")).toBeVisible();
  await expect(page.getByText("Email is required.")).toBeVisible();

  await page.route("**/api/contact", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ ok: true }),
    });
  });

  await page.getByLabel("Name").fill("Test User");
  await page.getByLabel("Email").fill("test@example.com");
  await page.getByLabel(/instagram handle/i).fill("@testhandle");
  await page.getByLabel(/message/i).fill("Hello!");

  await page.getByRole("button", { name: /send message/i }).click();
  await expect(page.getByText("Thanks — we’ve received your message.")).toBeVisible();
});
