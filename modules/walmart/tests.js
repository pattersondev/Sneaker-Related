const got = require('got');
const {CookieJar, Store, Cookie} = require ('tough-cookie')
const {promisify} = require('util')
const { v4: uuidv4 } = require('uuid')
const cookieJar = new CookieJar()
const fs = require('fs')
const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())
var email = 'pattersonrsssam@gmail.com'
var pass = 'Phoenixsuns14!'
const fakeUserAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:53.0) Gecko/20100101 Firefox/53.0'
var useCookies
async function doShit () {
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
    await page.goto('https://www.walmart.com/account/login')
    await page.focus('#email')
    await page.keyboard.type(email)
    await page.keyboard.press("Tab")
    await page.keyboard.type(pass)
    await page.click('#sign-in-form > button.button.m-margin-top.text-inherit')
    await page.waitForNavigation()
    var cookies = await page.cookies()
    useCookies = cookies.map(cookie => `${cookie.name}=${cookie.value}`).join('; ')
    console.log(useCookies)
    await browser.close()
    try {
        console.log('Visiting Homepage')
        await got('https://www.walmart.com/', {
            cookieJar: cookieJar,
            headers: {
                'credentials': 'include',
                'cookie' : useCookies,
                'omitcsrfjwt': 'true',
                'origin': 'https://www.walmart.com',
                'pragma': 'no-cache',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-origin',
                'user-agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Mobile Safari/537.36',
                'wm_site_mode': '0',
                'accept': 'application/json, text/javascript, */*; q=0.01',
                'accept-encoding': 'gzip, deflate, br',
                'accept-language': 'en-US,en;q=0.9',
                'cache-control': 'no-cache',
                'content-type': 'application/json',
            }
        })
    }catch(err) {
        console.log(err)
    }
    try{
        console.log('Attempting ATC')
        const {body, statuscode} = await got.get('https://www.walmart.com/pac?id=8844b629-e95a-4f71-95da-9b87aa7fb4b0&quantity=1&cv=14', {
            cookieJar: cookieJar,
            headers: {
                'pragma': 'no-cache',
                'referer': 'https://www.walmart.com/ip/Athletic-Works-Men-s-Ankle-Socks-12-Pack/925655734',
                'sec-fetch-dest': 'document',
                'sec-fetch-mode': 'navigate',
                'sec-fetch-site': 'same-origin',
                'sec-fetch-user': '?1',
                'service-worker-navigation-preload': 'true',
                'upgrade-insecure-requests': '1',
                'user-agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Mobile Safari/537.36',
                'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                'accept-encoding': 'gzip, deflate, br',
                'accept-language': 'en-US,en;q=0.9',
                'cache-control': 'no-cache'
            }
        })
        console.log(statuscode, body)
    }catch(err) {
        console.log(err)
    }
    try{
        console.log('Setting Shipping')
        await got.post('https://www.walmart.com/api/checkout/v3/contract/:PCID/fulfillment', {
            cookieJar: cookieJar,
            headers: {
                'accept': 'application/json, text/javascript, */*; q=0.01',
                'accept-encoding': 'gzip, deflate, br',
                'accept-language': 'en-US,en;q=0.9',
                'cache-control': 'no-cache',
                'content-length': '115',
                'content-type': 'application/json',
                'inkiru_precedence': 'false',
                'origin': 'https://www.walmart.com',
                'pragma': 'no-cache',
                'referer': 'https://www.walmart.com/checkout/',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-origin',
                'user-agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Mobile Safari/537.36',
                'wm_cvv_in_session': 'true',
                'wm_vertical_id': '0',
            },
            body: JSON.stringify(
                {"groups":[{"fulfillmentOption":"S2H","itemIds":"5b97ee29-b698-41ab-9444-d90cd04ec6b9","shipMethod":"STANDARD"}]}
            )
        })
        
    }catch(err) {
        console.log(err)
    }
}

doShit()