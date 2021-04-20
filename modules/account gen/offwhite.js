/**
 * @version 12/18/2020
 * @author Font
 * 
 * Generates accounts for offwhite
 */

const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

const fakeUserAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:53.0) Gecko/20100101 Firefox/53.0'
const targetAccCreate = 'https://login.target.com/gsp/static/v1/login/?client_id=ecom-web-1.0.0&ui_namespace=ui-default&back_button_action=browser&keep_me_signed_in=true&kmsi_default=false&actions=create_session_create_account'
let firstName = 'Sam'
let lastName = 'Patterson'
let email = 'adslkkbihojlmhjsadf@gmail.com'
let password = 'thisIsATest123'
async function owAccount () {
const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
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
    await page.goto('https://www.off---white.com/', { waitUntil: 'domcontentloaded'})
    await page.goto('https://www.off---white.com/en-us/guest-account', {
        referer: 'https://www.off---white.com/',
        waitUntil: 'networkidle0'
    })
    await page.goto('https://www.off---white.com/en-us/account/login', {
        referer: 'https://www.off---white.com/en-us/guest-account',
        waitUntil: 'networkidle0'
    })
    await page.waitForSelector('#tabpanel-login > form > a')
    await page.click('#tabpanel-login > form > a')
    await page.waitForSelector('#registerForm-fullName')
    await page.focus('#registerForm-fullName')
    await page.keyboard.type(firstName + ' ' + lastName)
    await page.focus('#registerForm-email')
    await page.keyboard.type(email, {delay: 100})
    await page.focus('#registerForm-password')
    await page.keyboard.type(password, {delay: 100})
    await page.focus('#registerForm-passwordConfirmation')
    await page.keyboard.type(password, {delay: 100})
    await page.click('#tabpanel-register > form > button')
    
    await page.waitForNavigation()
    if (page.url() === 'https://www.off---white.com/en-us/account') {
        console.log('success')
    } else {
        console.log('error')
    }

}

owAccount()