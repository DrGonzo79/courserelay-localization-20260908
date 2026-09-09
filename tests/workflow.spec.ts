import { expect, test } from "@playwright/test";

test("ranks markets, shortlists a course, and models a pilot", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /Find the course worth translating/i })).toBeVisible();
  const first = page.locator(".course").first();
  await expect(first).toContainText("Excel Automation for Operations");

  await page.getByLabel("Target market").selectOption("Spanish");
  await expect(page.locator(".course").first()).toContainText("Practical AI for Real Estate Agents");

  const course = page.locator(".course").filter({ hasText: "Practical AI for Real Estate Agents" });
  await course.getByRole("button", { name: /Add Practical AI.*to shortlist/ }).click();
  await page.getByRole("button", { name: /Shortlist 1/ }).click();
  await expect(page.locator(".course")).toHaveCount(1);

  await page.getByRole("button", { name: "Analyze" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.getByRole("button", { name: /Run opportunity check/ }).click();
  await expect(page.getByText(/Pilot this market|Validate this market/)).toBeVisible();
  await expect(page.getByText("Illustrative only.")).toBeVisible();
});

test("shows empty and rights-conflict states", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("Search courses").fill("no such course");
  await expect(page.getByRole("heading", { name: "No matching courses" })).toBeVisible();
  await page.getByRole("button", { name: "Show market radar" }).click();

  await page.getByLabel("Target market").selectOption("Spanish");
  const served = page.locator(".course").filter({ hasText: "Restaurant Food Photography" });
  await served.getByRole("button", { name: "Analyze" }).click();
  await page.getByRole("button", { name: /Run opportunity check/ }).click();
  await expect(page.locator(".notice[role=alert]")).toContainText("already lists Spanish");
});

test("has no horizontal overflow on mobile", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "Mobile-only overflow assertion");
  await page.goto("/");
  const dimensions = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, client: document.documentElement.clientWidth }));
  expect(dimensions.scroll).toBeLessThanOrEqual(dimensions.client + 1);
});
