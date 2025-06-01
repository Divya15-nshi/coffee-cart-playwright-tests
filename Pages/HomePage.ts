import { Page, expect , Locator } from '@playwright/test';

export class HomePage {

  readonly page: Page;
  readonly menuButton: Locator;
  readonly cartButton: Locator;
  readonly githubLink: Locator;
  readonly coffee: Locator;
  readonly bar: Locator;
  readonly totalButton: Locator;
  readonly coffeeImage: Locator;
  readonly coffeeTitles: Locator;
  readonly cartPreview: Locator;


  constructor(page: Page) {
    this.page = page;
    this.menuButton = page.getByRole('listitem').filter({ hasText: 'menu' });
    this.cartButton = page.getByRole('link', { name: 'Cart page' });
    this.githubLink = page.getByRole('link', { name: 'github page' });
    this.coffee = page.locator('.cup-body');
    this.totalButton = page.locator('[data-test="checkout"]')
    this.bar = page.locator(".snacbar");
    this.coffeeTitles = page.getByRole("list").getByRole("heading");
    this.cartPreview = page.locator('.cart-preview');
  }

  async openApplication() {
    await this.page.goto('https://coffee-cart.app/');
    }

  async goToCart() {
    await this.cartButton.click();
    await this.page.waitForURL('https://coffee-cart.app/cart');
  }

  async gotoPaymentPage(){
    await this.totalButton.click();
  }

  async navigateToGitHubPage(): Promise<void> {
    await this.githubLink.click();
    await this.page.waitForURL('https://coffee-cart.app/github');
  }

  async openPaymentPopup(): Promise<void> {
    await this.totalButton.click();
    const paymentModal = this.page.locator('.modal:has-text("Payment details")');
    await expect(paymentModal).toBeVisible({ timeout: 5000 });
  }

  async doubleClickOn(coffeeName:String):Promise<void>{
    await this.coffeeTitles.first().dblclick();
  }

  async rightClickCoffee(page,coffeeName:string) {
    const locator = page.locator(`[data-test="${coffeeName}"]`);
    await locator.click({ button: 'right' });
    const modal = page.locator('dialog[data-cy="add-to-cart-modal"]');
    await expect(modal).toBeVisible();
    await modal.getByRole('button', { name: 'Yes' }).click();
  }

  async leftClickCoffee(page, coffeeName:string){
    const locator = page.locator(`[data-test="${coffeeName}"]`);
    await locator.click({ button: 'left'});
  }

  async  checkAdvertisementViaUrl(page, url:string){
    await page.goto(url);
  }

  async hoverOnCoffee(page: Page, coffeeName: string) {
    const coffeeItem = page.locator(`li:has-text("${coffeeName}") .cup-body`);
    await coffeeItem.first().hover();
  }

  async updatingCoffee(operation: string, coffeeName: string) {
    await this.totalButton.hover();
    await this.page
      .locator(".cart-preview")
      .locator(".unit-controller")
      .getByLabel(operation + " one " + coffeeName)
      .click();
  }
  
  async addCoffeeByName(name: string) {
    await this.page.locator(`[data-test="${name}"]`).click();
  }

  async removeOneItem(name: string) {
    await this.page.getByRole('button', { name: `Remove one ${name}`, exact: true }).click();
  }

  async getCoffeeItem(name: string) {
    return this.page.locator(`[aria-label="${name}"]`);
  }

  async getBorderColor(coffeeName: string): Promise<string | null> {
    const coffeeItem = this.page.locator(`[aria-label="${coffeeName}"]`);
    await coffeeItem.hover();
    await this.page.waitForTimeout(300); 
    return await coffeeItem.evaluate((el) => {
    const style = window.getComputedStyle(el);
    return style.borderColor || null;
    });
  }

  async getIngredients(coffeeName: string): Promise<void> {
    const coffee = this.page.locator(`.cup-body[aria-label="${coffeeName}"]`);
    const ingredients = coffee.locator('.ingredient');
    const count = await ingredients.count();
    console.log(`Ingredients for ${coffeeName}:`);
    for (let i = 0; i < count; i++) {
      const text = await ingredients.nth(i).innerText();
      console.log(`- ${text}`);
    }
  }
}