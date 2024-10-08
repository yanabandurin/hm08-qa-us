const page = require('../../page');
const helper = require('../../helper')

describe('Create an order', () => {
    it('should fill address', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await expect($(page.fromField)).toHaveValue('East 2nd Street, 601');
        await expect($(page.toField)).toHaveValue('1300 1st St');
    })

    it('Selecting Supportive plan', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.callTaxiButton();
        const supportivePlanSelected = await $(page.supportivePlanSelected);
        await supportivePlanSelected.waitForDisplayed();
        await supportivePlanSelected.click();
        await expect($(page.supportiveIcon)).toBeExisting();

 })

    it('should save the phone', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.callTaxiButton();
        const supportivePlanSelected = await $(page.supportivePlanSelected);
        await supportivePlanSelected.waitForDisplayed();
        await supportivePlanSelected.click();
        await expect($(page.supportiveIcon)).toBeExisting();
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        await expect(await helper.getElementByText(phoneNumber)).toBeExisting();
    })
    it('Add credit card', async() => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.callTaxiButton();
        const supportivePlanSelected = await $(page.supportivePlanSelected);
        await supportivePlanSelected.waitForDisplayed();
        await supportivePlanSelected.click();
        await expect($(page.supportiveIcon)).toBeExisting();
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        const creditCardNumber = helper.getcardNumber();
        const creditCardCode = helper.getcardCode();
        await page.creditcardPayment(creditCardNumber,creditCardCode);
        await expect($(page.addedCard)).toBeExisting();
         })
         it('Messege for driver', async() => {
            await browser.url(`/`)
            await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
            await page.callTaxiButton();
            await page.driverMessegeField('Get chocolate');
            await browser.pause(5000);
            await expect($(page.messegeForDriver)).toHaveValue('Get chocolate');
         })
         it('Ordering a Blanket and handkerchiefs',async() => {
            await browser.url(`/`)
            await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
            await page.callTaxiButton();
            const supportivePlanSelected = await $(page.supportivePlanSelected);
            await supportivePlanSelected.waitForDisplayed();
            await supportivePlanSelected.click();
            // await expect($(page.supportiveIcon)).toBeExisting();
            await page.clickBlanketSwitch();
            await browser.pause(5000);
            await expect($(page.blanketSwitch)).toBeChecked();  
         })
         it('Ordering Ice Cream', async() => {
            await browser.url(`/`)
            await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
            await page.callTaxiButton();
            const supportivePlanSelected = await $(page.supportivePlanSelected);
            await supportivePlanSelected.waitForDisplayed();
            await supportivePlanSelected.click();
            await page.orderIceCream();
            await expect($(page.iceCreamValue)).toHaveText('2');
         })
         it('should show the car search modal', async() => {
            await browser.url(`/`)
            await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
            await page.callTaxiButton();
            const supportivePlanSelected = await $(page.supportivePlanSelected);
            await supportivePlanSelected.waitForDisplayed();
            await supportivePlanSelected.click();
            await page.driverMessegeField('Get chocolate');
            await page.confirmRide();
            await expect($(page.confirmRideButton)).toBeExisting();
         })
});

