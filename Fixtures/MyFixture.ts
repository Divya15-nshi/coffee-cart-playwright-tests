import {test as baseTest} from "@playwright/test"
import { HomePage } from '../Pages/HomePage';
import { PaymentPage } from '../Pages/PaymentPage';
import { CartPage } from '../Pages/CartPage';
import { PromotionPage } from "../Pages/PromotionPage";

type MyPomFixtures = {
    homePage : HomePage;
    paymentPage : PaymentPage;
    cartPage : CartPage;
    promotionPage : PromotionPage;

    
}

export const test = baseTest.extend<MyPomFixtures> ({
    homePage : async({page}, use) => {
        const homePage = new HomePage(page);
        await use(homePage);
    },
    paymentPage : async({page}, use) => {
        const paymentPage= new PaymentPage(page);
        await use(paymentPage);
    },
    cartPage : async({page}, use) => {
        const cartPage = new CartPage(page);
        await use(cartPage);
    },
    promotionPage : async({page}, use) => {
        const promotionPage = new PromotionPage(page);
        await use(promotionPage);

    },
})
 export {expect} from "@playwright/test"