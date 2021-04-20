/**
 * @author Sam Patterson
 * @version 01/04/2021
 */
const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())
var user = 'pattersonrsssam@gmail.com'
var pass = 'Phoenixsuns14!'

const fakeUserAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:53.0) Gecko/20100101 Firefox/53.0'

async function checkOrder () {
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

    await page.goto('https://www.walmart.com/account/login?returnUrl=%2Faccount%2Fwmpurchasehistory%3Fr%3Dyes')
    await page.focus('#email')
    await page.keyboard.type(user)
    await page.focus('#password')
    await page.keyboard.type(pass)
    await page.click('#sign-in-form > button.button.m-margin-top.text-inherit')
    await page.waitForNavigation()
    const orderStatus = await page.evaluate(() => document.querySelector('#main-content > div > div.Grid-col.u-size-1-1.recent-orders-content > div > span > div.hide-content-max-m > ul > li > div > ul > li > div > div:nth-child(1) > span').innerText);
    console.log(orderStatus)
    await browser.close()
}

checkOrder()