/**
 * @author Sam Patterson
 * @version 12/29/2020
 */


const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())


var email = 'pattdddsdasddfs@gmail.com'
const fakeUserAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:53.0) Gecko/20100101 Firefox/53.0'

async function clickReset () {
    const browser = await puppeteer.launch({
    args: ["--disable-web-security"],
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
    await page.setRequestInterception(true);
    page.on('request', (request) => {
    if (['image'].indexOf(request.resourceType()) !== -1) {
        request.abort();
    } else {
        request.continue();
    }
    });

    await page.goto('https://www.nike.com/login', {
        waitUntil: 'networkidle0'
    })
    await page.waitForSelector('.mex-unite-container > #nike-unite-login-view > #nike-unite-loginForm > #keepMeLoggedIn > .checkbox')
    await page.click('.mex-unite-container > #nike-unite-login-view > #nike-unite-loginForm > #keepMeLoggedIn > .checkbox')
    await page.keyboard.press('Tab')
    await page.keyboard.press('Enter', {
        waitUntil: 'networkidle0'
    })
    await page.focus('[placeholder="Email address"]')
    await page.keyboard.type(email)
    await page.keyboard.press('Tab')
    await page.keyboard.press('Enter', {
        waitUntil: 'networkidle0'
    })

    // sends email just fine but sucess detection isn't currently working

    await page.waitForSelector('.mex-unite-container > #nike-unite-confirm-password-reset-view > #nike-unite-confirmPasswordResetForm > header > .view-header')
    await page.click('.mex-unite-container > #nike-unite-confirm-password-reset-view > #nike-unite-confirmPasswordResetForm > header > .view-header')
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')
    await page.keyboard.press('Enter')

    if (page.url() === 'https://www.nike.com/login') {
        console.log('Email Sent')
    } else {
        console.log('Failed')
    }
}
clickReset()