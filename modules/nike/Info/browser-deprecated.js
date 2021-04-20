/**
 * @author Sam Patterson
 * @version 12/26/2020
 */

const { createCursor } = require('ghost-cursor')
const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())


var email = 'pattersonrsssam@gmail.com'
var password = 'Phoenixsuns14'
const fakeUserAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:53.0) Gecko/20100101 Firefox/53.0'
var firstName = 'bernard'
var lastName = 'goozeman'
var address = '21969 Stonestile Place'
var apt = ''
var city = 'ashburn'
var zip = '20148'
var state = 'virginia'
var country = 'United States'
var countryAbbrv = country.substring(0, 5)
var first4state = state.substring(0, 3)
var phone = '5712221342'
var cnb = '4242424242424242'
var cnb1 = cnb.substring(0, 4)
var cnb2 = cnb.substring(4, 8)
var cnb3 = cnb.substring(8, 12)
var cnb4 = cnb.substring(12, 16)
var cnb5 = cnb.substring(13, 16)
var expMonth = '04'
var expYear = '2023'
var abbrvExpYear = expYear.substring(2, 4)
var cvv = '123'



async function saveInfo () {
    const browser = await puppeteer.launch({
    args: ["--disable-web-security"],
    headless: false,
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

    // Hey fitz it's right below

    const cursor = createCursor(page)
    await page.goto('https://www.nike.com/login?continueUrl=https://www.nike.com/member/profile', {
        waitUntil: 'domcontentloaded',
    })
    await page.waitForSelector('[value="SIGN IN"]')
    await page.focus('[placeholder="Email address"]')
    await page.keyboard.type(email, {delay: 50})
    await page.focus('[placeholder="Password"]')
    await page.keyboard.type(password, {delay: 50})
    await cursor.click('[value="SIGN IN"]')
    //Signs in
    await page.waitForNavigation({
        waitUntil: 'domcontentloaded'
    })
    await page.waitForSelector('[aria-label="Settings"]')
    await cursor.click('[aria-label="Settings"]')
    await page.waitForSelector('#settings > div.mex-nav-title.d-sm-b.mb6-lg.mb12-sm > h2')
    await cursor.click('#settings > div.mex-nav-title.d-sm-b.mb6-lg.mb12-sm > h2')
    await page.keyboard.press("Tab")
    await page.keyboard.press("Tab")
    await page.keyboard.press("Tab")
    await page.keyboard.press("Enter")
    //brings you to delivery
    await page.waitForSelector('.mex-addresses-wrapper > div > .d-sm-flx > .d-sm-h > .mt8-sm')
    await cursor.click('.mex-addresses-wrapper > div > .d-sm-flx > .d-sm-h > .mt8-sm')
    await page.waitForSelector('[name="givenName"]')
    await page.focus('[name="givenName"]')
    await page.keyboard.type(firstName, {delay: 40})
    await page.focus('[name="familyName"]')
    await page.keyboard.type(lastName, {delay: 40})
    await page.focus('[name="address1"]')
    await page.keyboard.type(address, {delay: 50})
    if(apt !== ('')) {
        await page.focus('[name="address2"]')
        await page.keyboard.type(apt, {delay: 20})
    }
    await page.focus('[name="country"]')
    await page.keyboard.type(country, {delay: 50})
    await page.keyboard.press("Enter")
    await page.focus('[name="state"]')
    await page.keyboard.type(state, {delay: 50})
    await page.keyboard.press("Enter")
    await page.focus('[name="city"]')
    await page.keyboard.type(city, {delay: 30})
    await page.focus('[name="code"]')
    await page.keyboard.type(zip, {delay: 50})
    await page.focus('[name="phone"]')
    await page.keyboard.type(phone, {delay: 50})
    await cursor.click('[name="preferred"]')
    await cursor.click('#modal-root > div > div > div > div > section > div.css-1h4dz32.e1eje3q30 > div > div > button')
    await page.waitFor(2000)
    //Shipping entry done
    await page.goto('https://www.nike.com/member/settings/', {
        referer: 'https://www.nike.com/member/settings/delivery-addresses',
        waitUntil: 'domcontentloaded'
    })
    //brings you to settings
    await page.waitForSelector('#settings > div.mex-nav-title.d-sm-b.mb6-lg.mb12-sm > h2')
    await cursor.click('#settings > div.mex-nav-title.d-sm-b.mb6-lg.mb12-sm > h2')
    await page.keyboard.press("Tab")
    await page.keyboard.press("Tab")
    await page.keyboard.press("Enter")
    //brings you to payment

    //deletes first card
    try {
        await page.waitForSelector('#mobile-container > div > div > form > div > div:nth-child(2) > div > div > div.mex-saved-payments > div > div:nth-child(1) > div > div.flex-child.ncss-col-sm-1 > button')
        await cursor.click('#mobile-container > div > div > form > div > div:nth-child(2) > div > div > div.mex-saved-payments > div > div:nth-child(1) > div > div.flex-child.ncss-col-sm-1 > button', {
            waitUntil: 'domcontentloaded'
        })
        await page.waitForSelector('#modal-root > div > div > div > div > section > div.css-1h4dz32.e1eje3q30 > div > div > button.mb6-sm.mb0-md.mr2-sm.css-pgm16i.ex41m6f0.btn-secondary-dark.btn-responsive')
        await cursor.click('#modal-root > div > div > div > div > section > div.css-1h4dz32.e1eje3q30 > div > div > button.mb6-sm.mb0-md.mr2-sm.css-pgm16i.ex41m6f0.btn-secondary-dark.btn-responsive')

    } catch(err) {
        console.log(err)
    }
    //adds new card
    await page.waitForSelector('.mex-saved-payments-wrapper > .mex-saved-payments-container > .mex-add-new-payment-container > .flx-jc-md-fe > .css-ms2h9m')
    await cursor.click('.mex-saved-payments-wrapper > .mex-saved-payments-container > .mex-add-new-payment-container > .flx-jc-md-fe > .css-ms2h9m')
    await page.waitForSelector('.css-1t0iycq > .mex-new-card > form > .mb3-sm:nth-child(3) > .nds-checkbox-label')
    await cursor.click('.css-1t0iycq > .mex-new-card > form > .mb3-sm:nth-child(3) > .nds-checkbox-label')
    await page.waitFor(1000)
    await page.waitForSelector('.css-1t0iycq > .mex-new-card > form > .mb3-sm:nth-child(3) > .nds-checkbox-label')
    await cursor.click('.css-1t0iycq > .mex-new-card > form > .mb3-sm:nth-child(3) > .nds-checkbox-label')
    await page.waitFor(1000)
    await page.waitForSelector('.css-1t0iycq > .mex-new-card > form > .mb3-sm:nth-child(3) > .nds-checkbox-label')
    await cursor.click('.css-1t0iycq > .mex-new-card > form > .mb3-sm:nth-child(3) > .nds-checkbox-label')
    //ready to enter card info
    await page.waitFor(1000)
    await cursor.click('#dialog-add-payment-method')
    await page.keyboard.press("Tab")
    await page.keyboard.type(cnb1 + ' ', {delay: 50})
    await page.keyboard.type(cnb2 + ' ', {delay: 50})
    await page.keyboard.type(cnb3 + ' ', {delay: 50})
    await page.keyboard.type(cnb4 + ' ', {delay: 50})
    await page.waitFor(3000)
    await page.keyboard.type(cnb5, {delay: 50})
    //cnb entry done
    await page.keyboard.press("Tab")
    await page.waitFor(500)
    await page.keyboard.type(expMonth + abbrvExpYear, {delay: 70})
    await page.keyboard.press("Tab")
    await page.waitFor(500)
    await page.keyboard.type(cvv, {delay: 70})
    await page.waitFor(1000)
    await page.waitForSelector('#preferred')
    await cursor.click('#preferred')
    await page.waitForSelector('.css-177th5q > .css-1h4dz32 > div > .d-md-flx > .mb6-sm')
    await cursor.click('.css-177th5q > .css-1h4dz32 > div > .d-md-flx > .mb6-sm', {
        waitUntil: 'networkidle0'
    })
    console.log('Success Dance')
    //billing entry done
    await browser.close()
}

saveInfo()