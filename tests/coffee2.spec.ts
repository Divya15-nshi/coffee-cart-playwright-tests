import {test , expect} from "../Fixtures/MyFixture"

test.describe("Cofee Cart Tests",()=>{
  test.beforeEach(async ({ page }) => {
    await page.goto("https://coffee-cart.app/");
  });


  test("Verify opening coffee application navigates the user to Coffee catalog Page", async({page , homePage})=>{
    await homePage.openApplication();
    await expect(page).toHaveURL("https://coffee-cart.app/"); 
  });

  test("Verify that application displays always the header which includes menu, cart and github", async({page ,  homePage})=>{
    await expect (homePage.menuButton).toBeVisible();
    await expect (homePage.cartButton).toBeVisible();
    await expect (homePage.githubLink).toBeVisible();
})

  test("Verify that user can always navigate to shopping cart page using cart in the header" , async({page ,  homePage}) =>{
    await homePage.goToCart();
    await expect(page).toHaveURL('https://coffee-cart.app/cart');
})

  test("Verify getting payment link via payment pop up" , async({page ,  homePage , paymentPage}) =>{
    await homePage.gotoPaymentPage();
    await paymentPage.getPaymentLink('Tanu shringi' , 'tanu15@gmail.com');
    await expect(page.locator('text=Thanks for your purchase')).toBeVisible();
})

  test("Verify the ingredients of every coffee in coffee catalog page" , async({page ,  homePage}) =>{
    await homePage.getIngredients('Americano');
})

  test("Verify navigating github page for more information about the application" , async({page ,  homePage}) => {
    await homePage.navigateToGitHubPage();
    await expect(page).toHaveURL('https://coffee-cart.app/github');
})

  test("Verify clicking on Total navigates user to Payment detail pop up", async({page,  homePage, paymentPage}) =>{
    await homePage.openPaymentPopup();
    await expect(paymentPage.paymentHeader).toHaveText('Payment details');
});

  test("Verify hovering on Total icon shows all the coffee in the cart", async({page ,  homePage}) =>{
    await homePage.addCoffeeByName('Mocha');
    await homePage.addCoffeeByName('Espresso');
    await homePage.totalButton.hover();
    await expect(homePage.cartPreview).toBeVisible();
});

  test("Verify by double click on any coffee item translate the coffee name into chinese" , async({page,  homePage}) =>{
    await homePage.doubleClickOn('Espresso');
    const translatedText = page.getByRole('heading', { name: '特浓咖啡 $' })
    await expect(translatedText).toContainText('特浓咖啡 $');
});


  test("Verify adding a coffee in the shopping cart by right click on any coffee item" , async({page ,  homePage}) =>{
    await homePage.rightClickCoffee(page, 'Espresso');
    await expect(homePage.cartButton).toContainText('cart (1)');
  })

  test("Verify adding a coffee in the shopping cart by left click on any coffee item" , async({page,  homePage}) =>{
    await homePage.leftClickCoffee(page,'Americano');
    await expect(homePage.cartButton).toContainText('cart (1)');
  })

 test("Verify checking advertisement by activating ad into URL" , async({page,  homePage}) =>{
    await homePage.checkAdvertisementViaUrl(page, 'https://coffee-cart.app/?ad=1');
    const ad = page.getByRole('button', { name: 'free 1 bag of coffe beans' });
    await expect(ad).toBeVisible();
  })

test("Verify deleting coffee items from shopping cart" , async({page,  homePage , cartPage}) =>{
  await homePage.addCoffeeByName('Mocha');
  await homePage.addCoffeeByName('Espresso');
  await expect (homePage.cartButton).toContainText('cart (2)');
  await homePage.goToCart();
  await cartPage.removeOneItem('Mocha');
  await expect (homePage.cartButton).toContainText('cart (1)');
});

test("Verify promotional offer on adding every 3rd coffee into the shopping cart" , async({page ,  homePage, promotionPage}) =>{
  await homePage.addCoffeeByName('Mocha');
  await homePage.addCoffeeByName('Espresso');
  await homePage.addCoffeeByName('Americano');
  await expect (promotionPage.promoTitle).toBeVisible();
})


test("Verify hovering coffee on coffee page shows the animation by tilting the coffee item and changes color to Orange", async({page ,  homePage}) =>{
   const borderColor = await homePage.getBorderColor('Espresso');
   console.log('Border Color:', borderColor);
   await expect(borderColor).toBe('rgb(218, 165, 32)');
});

  test("Verify removing items from shopping cart by hovering on Total icon" ,async({page ,  homePage}) =>{
    await homePage.addCoffeeByName('Espresso');
    await homePage.addCoffeeByName('Americano');
    await expect (homePage.cartButton).toContainText('cart (2)');
    await homePage.totalButton.hover();
    await homePage.removeOneItem("Americano");
    await expect (homePage.cartButton).toContainText('cart (1)');
  })


  test("Verify updating count of every coffee item in the shopping cart" , async({page,  homePage, cartPage}) =>{
    await homePage.addCoffeeByName("Espresso");
    await homePage.addCoffeeByName("Americano");
    await expect (homePage.cartButton).toContainText('cart (2)');
    await homePage.updatingCoffee('add', 'Espresso');
    await expect (homePage.cartButton).toContainText('cart (3)');
  })
 

test("Verify removing items in the cart when some coffee items are already available in the cart page" , async({page,  homePage ,cartPage }) =>{
   await homePage.addCoffeeByName("Espresso");
   await homePage.addCoffeeByName("Americano");
   await expect (homePage.cartButton).toContainText('cart (2)');
   await homePage.goToCart();
   await cartPage.removeOneItem('Americano');
   await expect (homePage.cartButton).toContainText('cart (1)');
  })
})
