import { type Locator, type Page } from "@playwright/test";


export class PromotionPage {
  readonly page: Page;
  readonly promoTitle: Locator;
  readonly discountedCoffee: Locator;
  readonly yesButton: Locator;
  readonly noButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.promoTitle = page.locator(".promo>span");
    this.discountedCoffee = page.getByTestId("(Discounted)_Mocha");
    this.yesButton = page.locator("button.yes");
    this.noButton = page.getByRole("button").getByText("Nah, i'll skip");
  }

  async ispromoVisible() {
    return await this.page.locator('.promo').isVisible();
  }

  async getIngredients() {
    return await this.discountedCoffee.locator('[class*="ingredient"]').allInnerTexts();
  }

  async getIngredientsPercent() {
    const percentage: string[] = [];
    const l = await this.discountedCoffee.locator('[class*="ingredient"]').all();
    for (const val of l) {
      const style = await val.getAttribute("style");
      if (style) {
        percentage.push(style);
      }
    }
    return percentage;
  }
}