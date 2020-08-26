from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys

userNameInput = "//input[@name='username']"
passwordInput = "//input[@name='password']"
customersLink = "//a[contains(text(),'Customers')]"
newCustomerButton = "//span[contains(text(),'Add new customer')]"
customerNameInput = "//input[@name='customerName']"


def wait_until_displayed(driver, selector):
        def condition(_):
            return browser.find_element_by_xpath(selector).is_displayed()

        return WebDriverWait(browser, 20).until(condition)



browser = webdriver.Chrome()
try:
    browser.get('https://alertfind-appserver-m1alertfind-qa.pub.devhub.k8.devfactory.com/')
    WebDriverWait(browser, 20).until(EC.presence_of_element_located((By.XPATH, userNameInput)))

    wait_until_displayed(browser, userNameInput)
    browser.find_element_by_xpath(userNameInput).send_keys('cmcroot')
    browser.find_element_by_xpath(passwordInput).send_keys('!hailst0rm')
    browser.find_element_by_xpath(passwordInput).send_keys(Keys.RETURN)

    for i in range(100):
        print (i)
        wait_until_displayed(browser, customersLink)
        browser.find_element_by_xpath(customersLink).click()

        wait_until_displayed(browser, newCustomerButton)
        browser.find_element_by_xpath(newCustomerButton).click()

        wait_until_displayed(browser, customerNameInput)
        browser.find_element_by_xpath(customerNameInput).clear()
        browser.find_element_by_xpath(customerNameInput).send_keys("New customer test name")
finally:
    browser.quit()