const {Builder, By, Key, until} = require('selenium-webdriver');
let chrome = require("selenium-webdriver/chrome");    
const fs = require('fs')
const emailsRaw = fs.readFileSync('./emails.json')
let emails = JSON.parse(emailsRaw)
const filteredEmails = [
  
]

const baseURL = "https://www.medarbejdersignatur.dk/produkter/nemid_medarbejdersignatur/nemid_selvbetjening/administrer_medarbejdere/"
emails = emails.map(email => email.toLowerCase()).filter(email => !filteredEmails.includes(email))

let options = new chrome.Options();


(async function removeSignatures() {
  options.addExtensions('./nemid.crx');
  let driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
  try {
    await driver.get('https://medarbejdersignatur.dk');
    //Store the ID of the original window
    const originalWindow = await driver.getWindowHandle();
    await driver.wait(until.titleIs('Administrér medarbejdere'), 100000);
    await timeout(20000)

    const table = await driver.findElement(By.id('adminBruger'));
    const tableBody = await table.findElement(By.css('tbody'));
    const tableRows = await tableBody.findElements(By.css('tr'));
    
    for (const row of tableRows) {
      const emailCell = await row.findElement(By.css('td:nth-child(2)'))
      const email = await emailCell.getText();


      if (emails.includes(email.toLowerCase())) {
        const manageCell = await row.findElement(By.css('td:last-child'));
        const removeButton = await manageCell.findElement(By.css('a:last-child'));
        const url = await removeButton.getAttribute('href');

        await driver.switchTo().newWindow('tab');
        await driver.get(url);

        await driver.wait(until.elementIsVisible(driver.findElement(By.id('revokeEmployeeForm'))))

        const employeeForm = await driver.findElement(By.id('revokeEmployeeForm'));
        const removeEmployee = await employeeForm.findElement(By.css('input[type="submit"]'))

        await removeEmployee.click();


        const confirmation = await driver.findElement(By.css("#article h2")).getText();

        if (confirmation == "Medarbejderen er slettet") {
          await driver.close()
          await driver.switchTo().window(originalWindow);
        }
        console.log('Removed employee with email:', email)
      }
    }


  
  } finally {
    await driver.quit();
  }
})();


const getMethods = (obj) => {
  let properties = new Set()
  let currentObj = obj
  do {
    Object.getOwnPropertyNames(currentObj).map(item => properties.add(item))
  } while ((currentObj = Object.getPrototypeOf(currentObj)))
  return [...properties.keys()].filter(item => typeof obj[item] === 'function')
}

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}