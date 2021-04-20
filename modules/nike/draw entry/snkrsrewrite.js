/**
 * @author Font
 * @version 12/19/2020
 */
const { createCursor } = require('ghost-cursor')
const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())
const fs = require('fs')
const { url } = require('inspector')
const got = require('got')
const cookiesFilePath = 'cookies.json'
var drawLink = 'https://www.nike.com/launch/t/air-jordan-11-adapt'

var headers;
var user = 'pattersonrsssam@gmail.com'
var pass = 'Phoenixsuns14'
var entryUrl;
let cookies
const fakeUserAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:53.0) Gecko/20100101 Firefox/53.0'

async function login () {
    const browser = await puppeteer.launch({
      //args: ['--proxy-server=https://166.0.212.28:65085'],
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

    const cursor = createCursor(page)
    await page.goto('https://www.nike.com/launch/login', {
        referer: 'www.nike.com/launch',
        waitUntil: 'domcontentloaded'
    })
    await page.waitForSelector('[type="email"]')
    await page.focus('[type="email"]')
    await page.keyboard.type(user, {delay: 50})
    await page.focus('[type="password"]')
    await page.keyboard.type(pass, {delay: 50})
    await cursor.click('[value="SIGN IN"]', {
        waitUntil: 'networkidle0'
    })
    cookies = await page.cookies()
}



async function drawEntry () {
    await login()
    const browser = await puppeteer.launch({
      //args: ['--proxy-server=https://166.0.212.28:65085'],
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

        await page.cookies()

        await page.setRequestInterception(true);
        page.on('request', (request) => {
            if (['image'].indexOf(request.resourceType()) !== -1) {
                request.abort();
            } else {
                request.continue();
            }
        });
        const cursor = createCursor(page)
        await page.goto(drawLink, {
            waitUntil : 'networkidle0'
        })
        // Add size selector clicking... Potentially simulate mouse movement to seem more human
        await page.waitForSelector('[data-qa="feed-buy-cta"]')
        await cursor.click('[data-qa="feed-buy-cta"]', {
            waitUntil: 'networkidle0'
        })
        await page.waitForSelector('[data-qa="save-button"]')
        await cursor.click('[data-qa="save-button"]')
        await page.setRequestInterception(true)
        page.on('request'),(request) => {
            if (request(url).includes('https://api.nike.com/launch/entries/v2/')) {
                    entryUrl = request(url)
                    useHeaders =  request.headers()
                    request.continue()
                    browser.close()
                    setTimeout(getResult(), 240000)
            } else {
                request.continue()
            }
        }
}

drawEntry()

async function getResult() {
    const {body, statuscode} = await got.get(entryUrl, {
        headers: {
            useHeaders
        }
    })
    if(statuscode !== 200) {
        console.log('Error Getting Result, Check Charges')
    } else if (body.text().includes('NON_WINNER')) {
        console.log('Entry not selected')
    } else if (body.text().includes('status') && !body.text().includes('NON_WINNER')) {
        console.log('Check Email')
    } else if (body.text().includes('estimatedResultAvailability')) {
        setInterval(resultNotAvailable(), 15000)
        console.log('Result not available, retrying...')
    }
}

async function resultNotAvailable () {
    const {body, statuscode} = await got.get(entryUrl, {
        headers: {
            useHeaders
        }
    })
    console.log(body, statuscode)
}
