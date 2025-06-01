import { Page, Locator } from '@playwright/test';

export class PaymentPage {
  readonly page: Page;
  readonly paymentHeader: Locator;
  readonly name: Locator;
  readonly email: Locator;
  readonly checkbox: Locator;
  readonly submitButton: Locator;


  constructor(page: Page) {
    this.page = page;
    this.paymentHeader = page.locator('.modal h1');
    this.name = page.getByLabel("Name");
    this.email = page.getByLabel("Email");
    this.checkbox = page.getByRole('checkbox', { name: 'Promotion checkbox' });
    this.submitButton = page.getByRole('button', { name: 'Submit' });
  }

  async getPaymentLink(nameVal: string , emailVal: string){
  await this.name.fill(nameVal);
  await this.email.fill(emailVal);
  await this.submitButton.click();
  }
}