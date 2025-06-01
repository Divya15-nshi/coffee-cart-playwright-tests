import { test , expect } from '@playwright/test'

test.describe("Cofee Cart Tests",()=>{
  test.beforeEach(async ({ page }) => {
    await page.goto("https://coffee-cart.app/");
  });


test("Verify opening coffee application navigates the user to Coffee catalog Page", async({page})=>{
    const coffeeItems = page.locator('.cup-body'); 
    await expect(coffeeItems).toHaveCount(9);
})

test("Verify that application displays always the header which includes menu, cart and github", async({page})=>{
    await expect(page.getByRole('link', { name: 'Menu page' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Cart page' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'GitHub page' })).toBeVisible();
    await expect(page.getByLabel('Cart page')).toContainText('cart (0)');
})

test("Verify adding a coffee in the shopping cart by left click on any coffee item" , async({page}) =>{
    await page.locator('[data-test="Espresso"]').click({ button: 'left'});
    await expect(page.locator('#app')).toContainText('cart (1)');
})

test("Verify adding a coffee in the shopping cart by right click on any coffee item" , async({page}) =>{
    await page.locator('[data-test="Espresso_Macchiato"]').click({button: 'right'});
    await page.getByRole('button', { name: 'Yes' }).click();
    await expect(page.getByLabel('Cart page')).toContainText('cart (1)');
})

test("Verify that user can always navigate to shopping cart page using cart in the header" , async({page}) =>{
    await page.getByRole('listitem').filter({ hasText: 'cart (0)' }).click();
    await expect(page).toHaveURL('https://coffee-cart.app/cart');
}) 

test("Verify navigating github page for more information about the application" , async({page}) => {
    await page.getByRole('link', { name: 'GitHub page' }).click();
    await expect(page.locator('#app')).toContainText('Here are the extra actions you can perform apart from the usual add to cart flows.');
})

test("Verify clicking on Total navigates user to Payment detail pop up", async({page}) =>{
    await page.locator('[data-test="checkout"]').click();
    await expect(page.locator('section')).toContainText('Payment details');
})

test("Verify by double click on any coffee item translate the coffee name into chinese" , async({page}) =>{
    await page.getByRole('heading', { name: 'Cappuccino $' }).dblclick();
    await expect(page.locator('#app')).toContainText('卡布奇诺 $19.00');
})

test("Verify getting payment link via payment pop up" , async({page}) =>{
    await page.locator('[data-test="checkout"]').click();
    await page.getByRole('textbox', { name: 'Name' }).fill('Tanu Shringi');
    await page.getByRole('textbox', { name: 'Email' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill('tanu15@gmail.com');
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.locator('#app')).toContainText('Thanks for your purchase. Please check your email for payment.');
})

test("Verify deleting coffee items from shopping cart" , async({page}) =>{
    await page.locator('[data-test="Mocha"]').click();
    await page.getByRole('link', { name: 'Cart page' }).click();
    await expect(page.getByLabel('Cart page')).toContainText('cart (1)');
    await page.getByRole('button', { name: 'Remove one Mocha' }).click();
    await expect(page.getByRole('paragraph')).toContainText('No coffee, go add some.');
    await expect(page.getByRole('list')).toContainText('cart (0)');
})

test("Verify the ingredients of every coffee in coffee catalog page" , async({page}) =>{
    const coffeeItems = await page.locator('.cup-body').all();
    for (const coffee of coffeeItems) {
    const name = await coffee.getAttribute('aria-label');
    const ingredients = await coffee.locator('.ingredient').allTextContents();
    console.log(`${name}: ${ingredients.join(', ')}`);
  }
  })

test("Verify updating count of every coffee item in the shopping cart" , async({page}) =>{
   await page.locator('[data-test="Espresso_Macchiato"]').click();
    await page.locator('[data-test="Cappuccino"]').click();
    await page.locator('[data-test="Mocha"]').click();
    await page.getByRole('listitem').filter({ hasText: 'cart (3)' }).click();
    await page.getByRole('button', { name: 'Add one Cappuccino' }).click();
    await expect(page.getByLabel('Cart page')).toContainText('cart (4)');
    await page.getByRole('button', { name: 'Remove one Espresso Macchiato' }).click();
    await expect(page.getByLabel('Cart page')).toContainText('cart (3)');
    })


test("Verify hovering coffee on coffee page shows the animation by tilting the coffee item and changes color to Orange", async({page}) =>{
  const cappuccino = page.locator('[data-test="Cappuccino"]');
  await cappuccino.hover();
  await page.waitForTimeout(300);
  const borderColor = await cappuccino.evaluate((el) =>
    getComputedStyle(el).borderColor
  );
  console.log('Border color on hover:', borderColor);
  await expect(borderColor).toBe('rgb(218, 165, 32)');
});

test("Verify checking advertisement by activating ad into URL" , async({page}) =>{
    await page.getByRole('link', { name: 'GitHub page' }).click();
    await page.getByRole('link', { name: 'https://coffee-cart.app/?ad=' }).click();
    await expect(page.getByRole('button', { name: 'free 1 bag of coffe beans' })).toBeVisible();
})

test("Verify removing items from shopping cart by hovering on Total icon" ,async({page}) =>{
    await page.locator('[data-test="Flat_White"]').click();
    await page.locator('[data-test="Americano"]').click();
    await expect(page.getByLabel('Cart page')).toContainText('cart (2)');
    await page.locator('[data-test="checkout"]').hover();
    await page.getByRole('button', { name: 'Remove one Americano' }).click();
    await expect(page.getByLabel('Cart page')).toContainText('cart (1)');
})

test("Verify hovering on Total icon shows all the coffee in the cart", async({page}) =>{
    await page.locator('[data-test="Espresso_Macchiato"]').click();
    await page.locator('[data-test="Cappuccino"]').click();
    await page.locator('[data-test="checkout"]').hover();
   await expect(page.getByLabel('Cart page')).toContainText('cart (2)');
})

test("Verify removing items in the cart when some coffee items are already available in the cart page" , async({page}) =>{
  await page.locator('[data-test="Espresso_Macchiato"]').click();
  await page.locator('[data-test="Mocha"]').click();
  await page.locator('[data-test="checkout"]').hover();
  await expect(page.getByLabel('Cart page')).toContainText('cart (2)');
  await page.getByRole('button', { name: 'Remove one Espresso Macchiato' }).click();
  await expect(page.locator('#app')).toContainText('cart (1)');
})

test("Verify promotional offer on adding every 3rd coffee into the shopping cart" , async({page}) =>{

    await page.locator('[data-test="Espresso_Macchiato"]').click();
    await page.locator('[data-test="Cappuccino"]').click();
    await page.locator('[data-test="Americano"]').click();
    await expect(page.locator('#app')).toContainText('It\'s your lucky day! Get an extra cup of Mocha for $4.');
    await expect(page.locator('.promo > div').first()).toBeVisible();
    await expect(page.getByRole('button', { name: 'Yes, of course!' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Nah, I\'ll skip.' })).toBeVisible();
 })


})