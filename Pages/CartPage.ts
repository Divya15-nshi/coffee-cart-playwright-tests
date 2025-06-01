import { type Locator, type Page , expect} from "@playwright/test";

export class CartPage {
  readonly page: Page;
  readonly cartItems: Locator;
  readonly deleteButton: Locator;
  readonly addButton: Locator;
  readonly totalButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.totalButton = page.getByTestId("checkout");
    this.cartItems = page.locator('[data-cy^="cart-item"]'); 
    this.deleteButton = page.locator('[data-cy^="delete-item"]'); 
    this.addButton = page.locator('[data-cy^="add-item"]');
  }


  async isCartVisible() {
    return await this.page.locator('h1', { hasText: 'Cart' }).isVisible();
  }

  async getTotalPrice() {
    const previ = await this.totalButton.innerText();
    const start = previ.indexOf("$");
    const end = previ.indexOf(".");
    const balance = Number(previ.substring(start + 1, end));
    return balance;
  }

  async removeOneItem(name: string) {
    await this.page.getByRole('button', { name: `Remove one ${name}`, exact: true }).click();
  }
  async getIncreaseButton(itemName: string) {
   return this.page.locator(`button[aria-label="Add one ${itemName}"]`);
}
async getDecreaseButton(itemName: string) {
  return this.page.locator(`button[aria-label="Remove one ${itemName}"]`);
}
async updatingCoffee(operation: string, coffeeName: string) {
    await this.totalButton.hover();
    await this.page
      .locator(".cart-preview")
      .locator(".unit-controller")
      .getByLabel(operation + " one " + coffeeName)
      .click();
  }


}