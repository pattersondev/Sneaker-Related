/**
 * @version 12/18/2020
 * @author Font
 * 
 * Generates accounts for walmart
 */

const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

const fakeUserAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:53.0) Gecko/20100101 Firefox/53.0'
let firstName = 'Sam'
let lastName = 'Patterson'
let email = 'dhafjlsdaaanfd@gmail.com'
let password = 'thisIsATest123'
async function walmartAccount () {
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
    await page.goto('https://www.walmart.com/account/signup?tid=0&returnUrl=%2F', { waitUntil: 'domcontentloaded'})
    await page.focus('#first-name-su')
    await page.keyboard.type(firstName)
    await page.focus('#last-name-su')
    await page.keyboard.type(lastName)
    await page.focus('#email-su')
    await page.keyboard.type(email)
    await page.focus('#password-su')
    await page.keyboard.type(password)
    await page.focus('#sign-up-form > button.button.s-margin-top.text-inherit')
    await page.click('#sign-up-form > button.button.s-margin-top.text-inherit')
    await page.waitForNavigation()

    //Always returns account creation failed, but accounts are always created need to edit
    if(page.url() === 'https://www.walmart.com/?action=Create&rm=true') {
        console.log('success')
    } else {
        console.log('error')
    }
}
walmartAccount()
