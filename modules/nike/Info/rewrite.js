const got = require('got')
const { createCursor } = require('ghost-cursor')
const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const { v4: uuidv4 } = require('uuid');
var { getCode, getName } = require('country-list');
var states = require('us-state-codes');
puppeteer.use(StealthPlugin())
var email = 'pattersonrsssam@gmail.com'
var password = 'Phoenixsuns14'
const fakeUserAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:53.0) Gecko/20100101 Firefox/53.0'
var firstName = 'bernardino'
var lastName = 'goozeman'
var address = '21969 Stonestile Place'
var apt = ''
var city = 'ashburn'
var zip = '20148'
var state = 'virginia'
var country = 'United States of America'
var phone = '5712221342'
var cnb = '4242424242424242'
var expMonth = '04'
var expYear = '2023'
var cvv = '123'
let token
let auth
let nikeUxId
let thisuuid = uuidv4()
let cardType
let cookies
let useCookies
var failed = false
var fuck = false
var errors

function getCountryCode () {
    return getCode(country)
}
function getProvince() {
    if (getCode(country).toLowerCase() === 'us') {
        return states.getStateCodeByStateName(state)
    } else if (getCountryCode.toLowerCase() === 'ca') {
        return state.substring(0, 3)
    }
}
function getCardType () {
    if (cnb[0] === '4') {
        cardType = 'VISA'
    } else if (cnb[0] === '5') {
        cardType = 'MASTERCARD'
    } else if (cnb[0] === '6') {
        cardType = 'DISCOVER'
    } else if (cnb[0] === '3') {
        cardType = 'AMEX'
    }
    return cardType
}

async function login () {
    try {
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

        const cursor = createCursor(page)
        await page.goto('https://www.nike.com/login?continueUrl=https://www.nike.com/member/profile', {
            waitUntil: 'domcontentloaded',
        })

        await page.waitForSelector('[value="SIGN IN"]')
        await page.focus('[placeholder="Email address"]')
        await page.keyboard.type(email, {delay: 80})
        await page.focus('[placeholder="Password"]')
        await page.keyboard.type(password, {delay: 80})
        await cursor.click('[value="SIGN IN"]')
        if (page.url() !== 'https://www.nike.com/member/profile') {
            await page.focus('[placeholder="Password"]')
            await page.keyboard.type(password, {delay: 80})
            await cursor.click('[value="SIGN IN"]')
        }
        await page.setRequestInterception(true);
        page.on('request', (request) => {
            if(request.url().includes('https://api.nike.com/identity/user/v')) {
                request.continue()
                var splitUrl = request.url().split('/')
                token = splitUrl[6]
                auth = request.headers()['authorization']
                nikeUxId = request.headers()['x-nike-ux-id']
                console.log('Got Tokens')
            } else {
                request.continue()
            }
        })
        cookies = await page.cookies()
        useCookies = cookies.map(cookie => `${cookie.name}=${cookie.value}`).join('; ')
        await page.waitForNavigation({
            waitUntil: 'networkidle0',
        })
        await browser.close()
    }catch (err) {
        failed = true
        console.log(err)
        console.log('Login Failed, Restart task to retry')
    }
}

async function submitShipping() {
    console.log('Submitting Shipping')
    try {
        await got.post('https://api.nike.com/identity/user/v1/' + token + '/address', {
            headers : {
                'authority' : 'api.nike.com',
                'pragma' : 'no-cache',
                'cache-control' : 'no-cache',
                'accept' : 'appliation/json',
                'accept-encoding': 'gzip, deflate, br',
                'authorization' : auth,
                'x-nike-ux-id' : nikeUxId,
                'user-agent' : fakeUserAgent,
                'content-type' : 'application/json',
                'origin' : 'https://www.nike.com',
                'sec-fetch-site' : 'same-site',
                'sec-fetch-mode' : 'cors',
                'sec-fetch-dest' : 'empty',
                'accept-language' : 'en-US,en;q=0.9'
            }, 
            body : JSON.stringify({
                code: zip,
                country: getCountryCode(),
                line1: address,
                line2: apt,
                line3: '',
                locality: city, 
                name: {
                kana: {
                    family: '',
                    given: ''
                },
                primary: {
                    family: lastName,
                    given: firstName
                    }
                },
                phone: {
                    primary: phone
                },
                preferred: true,
                province: getProvince(),
                zone: ''
            })
        })
    } catch (err) {
        fuck = true
        console.log(err)
    }
}

async function submitPayment () {
    console.log('Submitting Payment')
    var errors = false
    try {
        await got.post('https://paymentcc.nike.com/creditcardsubmit/' + thisuuid + '/store', {
            headers: {
                'Accept-Encoding': 'gzip, deflate, br',
                'Accept-Language': 'en-US,en;q=0.9',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
                'Content-Type': 'application/json; charset=UTF-8',
                'Cookie' : useCookies,
                'Host': 'paymentcc.nike.com',
                'Origin': 'https://paymentcc.nike.com',
                'Pragma': 'no-cache',
                'Referer': 'https://paymentcc.nike.com/services/default?id=' + thisuuid + '&ctx=checkout&language=en&maskerEnabled=true',
                'Sec-Fetch-Dest': 'empty',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'same-origin',
                'User-Agent': fakeUserAgent
            }, 
            body : JSON.stringify({
                'accountNumber': cnb,
                'cardType': getCardType(),
                'creditCardInfoId': thisuuid,
                'cvNumber': cvv,
                'expirationMonth': expMonth,
                'expirationYear': expYear
            })
        })
    } catch (err) {
        console.log(err)
    }
    try {
        await got.post('https://api.nike.com/commerce/storedpayments/consumer/savepayment', {
            headers : {
                'pragma' : 'no-cache',
                'cache-control' : 'no-cache',
                'accept' : 'application/json',
                'accept-language' : 'en-US,en;q=0.9',
                'accept-encoding': 'gzip, deflate, br',
                'authorization' : auth,
                'user-agent' : fakeUserAgent,
                'content-type' : 'application/json',
                'origin' : 'https://www.nike.com',
                'referer' : 'https://www.nike.com/',
                'sec-fetch-site' : 'same-site',
                'sec-fetch-mode' : 'cors',
                'sec-fetch-dest' : 'empty'
            }, 
            body : JSON.stringify({
                "type":"CreditCard",
                "creditCardInfoId": thisuuid,
                "isDefault": true,
                "currency":"USD",
                "billingAddress": {
                    "firstName":firstName,
                    "lastName":lastName,
                    "address1":address,
                    "address2":apt,
                    "address3":"",
                    "state": getProvince(),
                    "city":city,
                    "postalCode":zip,
                    "country": getCountryCode(),
                    "email": email
                }
            })
        })
        console.log('Information Saved')
    } catch (err) {
        errors = true
        console.log(err)
    }
}

async function submitInfo() {
    await login()
    if (failed = false) {
        await submitShipping()
        await submitPayment()
    } else {
        console.log('Error!')
    }
    
}

submitInfo()

