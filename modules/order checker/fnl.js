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

    await page.goto('https://www.finishline.com/store/myaccount/orderTrackingInner.jsp?orderId=&zip=')
    await page.waitForSelector('#orderId')
    await page.focus('#orderId')
    await page.keyboard.type(orderNum)
    await page.focus('#zip')
    await page.keyboard.type(zip)
    await page.waitForSelector('#orderInquiryForm > input.button')
    await page.click('#orderInquiryForm > input.button', {
        waitUntil: 'networkidle0'
    })
    await page.waitForSelector('#results > table > tbody > tr:nth-child(1) > td.product > strong')
    const product = await page.evaluate(() => document.querySelector('#results > table > tbody > tr:nth-child(1) > td.product > strong').innerText);
    console.log(product)
    const orderStatus = await page.evaluate(() => document.querySelector('#results > table > tbody > tr:nth-child(1) > td.status > span > strong').innerText);
    console.log(orderStatus)
    try {
        const tracking = await page.evaluate(() => document.querySelector('#results > table > tbody > tr:nth-child(1) > td.status > span > a').innerText);
        console.log(tu(tracking))
        await browser.close()
    } catch (err) {
        await browser.close()
        console.log('Tracking not available')
    }   

}
checkOrder()