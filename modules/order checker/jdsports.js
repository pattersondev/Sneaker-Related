/**
 * @author Sam Patterson
 * @version 01/04/2021
 */
const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())
var tu = require('tracking-url');
var zip = '78703'
var orderNum = '6644441114'

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

    await page.goto('https://www.jdsports.com/store/customerservice/contactUs.jsp')
    await page.waitForSelector('#orderId')
    await page.focus('#orderId')
    await page.keyboard.type(orderNum)
    await page.focus('#zip')
    await page.keyboard.type(zip)
    await page.click('#purchaseDetailsTrackOrder')
    await page.waitForNavigation()
    await page.waitForSelector('#skippedNavigation > div > div.row.align-center > div > div:nth-child(4) > div:nth-child(2) > div > div:nth-child(3)')
    const orderStatus = await page.evaluate(() => document.querySelector('#skippedNavigation > div > div.row.align-center > div > div:nth-child(4) > div:nth-child(2) > div > div:nth-child(3)').innerText);
    console.log(orderStatus)
    const product = await page.evaluate(() => document.querySelector('#skippedNavigation > div > div.row.align-center > div > div.row.pt-2.pb-2 > div.column.pl-0 > div > div.column.small-12.medium-4 > strong').innerText);
    console.log(product)
    try {
        await page.click('#skippedNavigation > div > div.row.align-center > div > div.row.pt-2.pb-2 > div.column.pl-0 > div > div:nth-child(2) > div > a')
        const trackingUSPS = await page.url().split('=')
        const tracking = trackingUSPS[1]
        console.log(tu(tracking))
        await browser.close()   
    } catch (err) {
        console.log('Tracking not available')
        await browser.close()
    }   

}
checkOrder()