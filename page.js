module.exports = {
    // Inputs
    fromField: '#from',
    toField: '#to',
    phoneNumberField: '#phone',
    codeField: '#code',
    cardNumber: '#number',
    cardCode: '.card-second-row #code',
    messegeForDriver: '#comment',
    // Buttons
    callATaxiButton: 'button=Call a taxi',
    phoneNumberButton: '//div[text()="Phone number"]',
    nextButton: 'button=Next',
    confirmButton: 'button=Confirm',
    supportivePlanSelected: '//div[starts-with(text(), "Supportive")]',
    supportiveIcon:  '//div[@class="tcard active"]//button[@data-for="tariff-card-4"]',
    cardButton: '//div[@class="pp-text"]',
    addCardButton: '//div[text()="Add card"]',
    linkcardButton: 'button=Link',
    addedCard: '//div[starts-with(text(), "Card")]',
    orderRequairments: '/html/body/div/div/div[3]/div[3]/div[2]/div[2]/div[4]/div[2]/div[1]/div/div[2]/div',
    blanketSwitch: '/html/body/div/div/div[3]/div[3]/div[2]/div[2]/div[4]/div[2]/div[1]/div/div[2]/div/input',
    iceCreamPlusButton: '//div[@class="counter-plus"]',
    iceCreamValue: '//div[@class="counter-value"]',
    confirmRideButton: '//button[@class="smart-button"]',

    // Modals
    phoneNumberModal: '.modal',
    paymentMetodModal: '.payment-picker.open',
    closeModalButton: '/html/body/div/div/div[2]/div[2]/div[1]/button',

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
        await browser.setupInterceptor();
        await $(this.nextButton).click();
        await browser.pause(2000);
        const codeField = await $(this.codeField);
        const requests = await browser.getRequests();
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
        await browser.pause(1000);  
        const closeModalButton = await $(this.closeModalButton);
        await closeModalButton.waitForDisplayed();
        await closeModalButton.click();
    },
    driverMessegeField: async function(messege) {
        const messegeForDriver = await $(this.messegeForDriver);
        await messegeForDriver.waitForDisplayed();
        await messegeForDriver.setValue(messege);
    },
    clickBlanketSwitch: async function () {
    const orderRequairments = await $(this.orderRequairments);
    await orderRequairments.waitForDisplayed();
    await orderRequairments.click();
    },
    orderIceCream: async function () {
        const iceCreamPlusButton = await $(this.iceCreamPlusButton);
        await iceCreamPlusButton.waitForDisplayed();
        await iceCreamPlusButton.click();
        await iceCreamPlusButton.click();
    },
    confirmRide: async function () {
        const confirmRideButton = await $(this.confirmRideButton);
        await confirmRideButton.waitForDisplayed();
        await confirmRideButton.click();
    
    }

};
