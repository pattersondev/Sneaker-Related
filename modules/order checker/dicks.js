/**
 * @author Sam Patterson
 * @version 01/04/2021
 */
const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())
var zip = '78703'
var orderNum = '10354490698'

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

    await page.goto('https://www.dickssportinggoods.com/TrackOrder?catalogId=12301&langId=&storeId=15108')
    await page.waitForSelector('#order-number-input')
    await page.focus('#order-number-input')
    await page.keyboard.type(orderNum)
    await page.focus('#zip-code-input')
    await page.keyboard.type(zip)
    await page.waitForSelector('#homr-modal > div > div')
    await page.click('#homr-modal > div > div')
    await page.click('#track-order-button > span > span', {
        waitUntil: 'domcontentloaded'
    })
    await page.waitForSelector('#track-orders-component > div:nth-child(2) > div > div > div:nth-child(2) > div:nth-child(3)')
    const orderStatus = await page.evaluate(() => document.querySelector('#track-orders-component > div:nth-child(2) > div > div > div:nth-child(2) > div:nth-child(3)').innerText);
    const product = await page.evaluate(() => document.querySelector('#order-table > div:nth-child(1) > table > tbody > tr > td.mat-cell.cdk-cell.cdk-column-productDescription.mat-column-productDescription.ng-star-inserted > div > div > div:nth-child(1) > span').innerText);
    console.log(product)
    console.log(orderStatus)
    await browser.close()
}

checkOrder()