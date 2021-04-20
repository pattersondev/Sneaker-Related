/**
 * @author Sam Patterson
 * @version 01/05/2021
 */
const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())
var tracking = '9405511202555523040701'


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

    if (tracking.substring(0, 2) === '94') {
        try {
            await page.goto('https://www.usps.com/manage/')
            await page.focus('#track-package--input')
            await page.keyboard.type(tracking)
            await page.click('#track-package--form > div > input.track-package--search.input--search')
            await page.waitForSelector('#tracked-numbers > div > div > div > div > div.product_summary.delivery_delivered > div.delivery_status > h2 > strong')
            const orderStatus = await page.evaluate(() => document.querySelector('#tracked-numbers > div > div > div > div > div.product_summary.delivery_delivered > div.delivery_status > h2 > strong').innerText);
            console.log(orderStatus)
            await browser.close()
        } catch (err) {
            await browser.close()
            console.log('Unable to get tracking info')
        }
    }
}

checkOrder()