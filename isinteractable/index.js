const {Builder, By, Key, until, WebElementCondition} = require('selenium-webdriver');
 
(async function main() {

    let userNameInput = By.xpath("//input[@name='username']");
    let passwordInput = By.xpath("//input[@name='password']");
    let customersLink = By.xpath("//a[contains(text(),'Customers')]");
    let newCustomerButton = By.xpath("//span[contains(text(),'Add new customer')]");
    let customerNameInput = By.xpath("//input[@name='customerName']");

    let driver = await new Builder()
        .forBrowser('chrome')
        .build();
    
    try {
        await driver.get('https://alertfind-appserver-m1alertfind-qa.pub.devhub.k8.devfactory.com/');

        await driver.wait(until.elementLocated(userNameInput))
        await driver.findElement(userNameInput).sendKeys('cmcroot');
        await driver.findElement(passwordInput).sendKeys('!hailst0rm', Key.RETURN);
        
        for(let i = 0; i < 100; i++){
            console.log(`Iteration ${i}`);

            await driver.wait(until.elementLocated(customersLink))
            await driver.findElement(customersLink).click();
            
            await driver.wait(until.elementLocated(newCustomerButton));
            await driver.findElement(newCustomerButton).click();
    
            let el = await driver.findElement(customerNameInput);
            await driver.wait(until.elementIsVisible(el))
            await driver.findElement(customerNameInput).sendKeys("New customer test name");
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
    finally {
        await driver.quit();
    }
    
})();