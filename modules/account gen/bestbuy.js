/**
 * @version 12/18/2020
 * @author Font
 * 
 * Generates accounts for bestbuy
 */

const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker')
puppeteer.use(StealthPlugin())
puppeteer.use(AdblockerPlugin())
const fakeUserAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:53.0) Gecko/20100101 Firefox/53.0'
let firstName = 'Sam'
let lastName = 'Patterson'
let email = 'fuckyophhombool@gmail.com'
let password = 'thisIsATest123'
phone = '5799371823'
async function bestbuyAccount () {
const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
    })
    const page = await browser.newPage()
    await page.evaluateOnNewDocument(fakeUserAgent => {
        let open = window.open

        window.open = (...args) => {
            let newPage = open(...args)
            Object.defineProperty(newPage.navigator, 'userAgent', {get: () => fakeUserAgent})
            return newPage
        }

        window.open.toString = () => 'function open() { [native code] }'
        
    }, fakeUserAgent)

    await page.setUserAgent(fakeUserAgent)
    await page.goto('https://www.bestbuy.com/', { waitUntil: 'domcontentloaded'})
    await page.click('#header-block > div.header-large > div.fullbleed-wrapper > div > nav.utility-navigation > ul > li:nth-child(1) > button')
    await page.waitForSelector('body > div.cia-app-container > div > section > main > div.cia-content.js-cia-content > div > div > div > div > div.cia-signin__create > div > div > a')
    await page.click('body > div.cia-app-container > div > section > main > div.cia-content.js-cia-content > div > div > div > div > div.cia-signin__create > div > div > a')
    await page.waitForSelector('#firstName')
    await page.focus('#firstName')
    await page.keyboard.type(firstName)
    await page.focus('#lastName')
    await page.keyboard.type(lastName)
    await page.focus('#email')
    await page.keyboard.type(email)
    await page.focus('#fld-p1')
    await page.keyboard.type(password)
    await page.focus('#reenterPassword')
    await page.keyboard.type(password)
    await page.focus('#phone')
    await page.keyboard.type(phone)
    await page.waitForSelector('[data-track = "Create Account"]')
    await page.click('[data-track = "Create Account"]')
    await page.waitForNavigation()

    if(page.url() === 'https://www.bestbuy.com/site/customer/myaccount') {
        console.log('success')
    } else {
        console.log('fail')
    }
};

bestbuyAccount()
