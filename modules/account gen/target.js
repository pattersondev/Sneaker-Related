/**
 * @author Font
 * @version 12/1/2020
 */

const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

const fakeUserAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:53.0) Gecko/20100101 Firefox/53.0'
const targetAccCreate = 'https://login.target.com/gsp/static/v1/login/?client_id=ecom-web-1.0.0&ui_namespace=ui-default&back_button_action=browser&keep_me_signed_in=true&kmsi_default=false&actions=create_session_create_account'
let firstName = 'test'
let lastName = 'test'
let email = 'sdasfadfsdsaf@gmail.com'
let password = 'thisIsATest123'
async function targetAccount () {
const browser = await puppeteer.launch({
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

    await page.setUserAgent(fakeUserAgent)
    await page.goto('https://www.target.com/', { waitUntil: 'domcontentloaded'}, {waitUntil: 'networkidle'})
    await page.click('#account > span.AccountLink__SvgUserWrapper-gx13jw-0.cpETQl > span > div > svg')
    await page.focus('#account > span.AccountLink__SvgUserWrapper-gx13jw-0.cpETQl > span > div > svg')
    
    await page.goto('https://target.com/#accountmenu',
    {
    waitUntil: 'networkidle0',
    referer: 'https://target.com/'
    });
    await page.click('#account > span.AccountLink__SvgUserWrapper-gx13jw-0.cpETQl > span > div > svg')
    await page.focus('#account > span.AccountLink__SvgUserWrapper-gx13jw-0.cpETQl > span > div > svg')
    await page.evaluate(()=>document.querySelector('#accountNav-createAccount > a').click())

    await page.waitForNavigation()
    await page.focus('#username')
    await page.keyboard.type(email)
    await page.focus('#firstname')
    await page.keyboard.type(firstName)
    await page.focus('#lastname')
    await page.keyboard.type(lastName)
    await page.focus('#password')
    await page.keyboard.type(password)
    await page.focus('#createAccount')
    await page.click('#createAccount')
    await page.waitForSelector('#circle-skip')
    await page.click('#circle-skip')
    await page.waitForNavigation()

    if(page.url() === 'https://www.target.com/') {
        console.log('success')
    } else {
        console.log('error')
    }

}
targetAccount();

