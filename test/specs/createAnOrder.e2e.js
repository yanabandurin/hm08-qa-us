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
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        await expect(await helper.getElementByText(phoneNumber)).toBeExisting();
    })
    it('Add credit card', async() => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        const creditCardNumber = helper.getcardNumber();
        const creditCardCode = helper.getcardCode();
        await page.creditcardPayment(creditCardNumber,creditCardCode);
        await expect(await page.addedCard).toBeExisting();
         })
});

