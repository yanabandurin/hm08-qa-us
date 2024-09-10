module.exports = {
    // Inputs
    fromField: '#from',
    toField: '#to',
    phoneNumberField: '#phone',
    codeField: '#code',
    cardNumber: '#number',
    cardCode: '.card-second-row #code',
    // Buttons
    callATaxiButton: 'button=Call a taxi',
    phoneNumberButton: '//div[@class="np-button"]',
    nextButton: 'button=Next',
    confirmButton: 'button=Confirm',
    supportivePlanSelected: '//div[starts-with(text(), "Supportive")]',
    supportiveIcon:  '//div[@class="tcard active"]//button[@data-for="tariff-card-4"]',
    cardButton: '//div[@class="pp-button filled"]',
    addCardButton: '//div[starts-with(text(), "Add card")]',
    linkcardButton: 'button=Link',
    addedCard: '//div[starts-with(text(), "Card")]',


    // Modals
    phoneNumberModal: '.modal',
    paymentMetodModal: '.payment-picker open',
    // Functions
    fillAddresses: async function(from, to) {
        const fromField = await $(this.fromField);
        await fromField.setValue(from);
        const toField = await $(this.toField);
        await toField.setValue(to);
    },
    callTaxiButton: async function() {
        const callATaxiButton = await $(this.callATaxiButton);
        await callATaxiButton.waitForDisplayed();
        await callATaxiButton.click();
    },
 fillPhoneNumber: async function(phoneNumber) {
        const phoneNumberButton = await $(this.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        const phoneNumberModal = await $(this.phoneNumberModal);
        await phoneNumberModal.waitForDisplayed();
        const phoneNumberField = await $(this.phoneNumberField);
        await phoneNumberField.waitForDisplayed();
        await phoneNumberField.setValue(phoneNumber);
    },
    submitPhoneNumber: async function(phoneNumber) {
        await this.fillPhoneNumber(phoneNumber);
        // we are starting interception of request from the moment of method call
        await browser.setupInterceptor();
        await $(this.nextButton).click();
        // we should wait for response
        // eslint-disable-next-line wdio/no-pause
        await browser.pause(2000);
        const codeField = await $(this.codeField);
        // collect all responses
        const requests = await browser.getRequests();
        // use first response
        await expect(requests.length).toBe(1)
        const code = await requests[0].response.body.code
        await codeField.setValue(code)
        await $(this.confirmButton).click();
    },
    creditcardPayment: async function(creditCardNumber, creditCardCode) {
        const cardButton = await $(this.cardButton);
        await cardButton.waitForDisplayed();
        await cardButton.click();
        const paymentModal = await $(this.paymentMetodModal);
        await paymentModal.waitForDisplayed();
        const addCardButton = await $(this.addCardButton);
        await addCardButton.waitForDisplayed();
        await addCardButton.click();
        const cardNumber = await $(this.cardNumber);
        await cardNumber.waitForDisplayed();
        const cardCode = await $(this.cardCode);
        await cardCode.waitForDisplayed();
        await cardNumber.setValue(creditCardNumber);
        await cardCode.setValue(creditCardCode);
        const linkcardButton = await $(this.linkcardButton);
        await linkcardButton.click();
    }
};