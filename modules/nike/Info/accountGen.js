const got = require('got')
const { createCursor } = require('ghost-cursor')
const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const { v4: uuidv4 } = require('uuid');
var { getCode, getName } = require('country-list');


/**
 * Generates nike accounts with requests but grabs cookies from a browser first.
 * 
 * @author Sam patterson
 * @version 3/3/2021
 */
const fakeUserAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:53.0) Gecko/20100101 Firefox/53.0'
let cookies;
let useCookies;
let userName = "asdfasdfasdfasd@gmail.com";
let passWord = "";
let firstName = "";
let lastName = ""
let dob = "xx/xx/xxxx"
let country = "";
let sex = "";

function getUserName() {
    return userName;
}

function getPass() {
    return passWord;
}

function getFirstname() {
    return firstName;
}

function getLastName() {
    return lastName;
}

function getDob() {
    return dob;
}

function getCountry() {
    return country;
}

function getSex() {
    return sex;
}

/**
 * Launches a browser and retrieves cookies needed to create an account.
 * @return cookies
 */
async function getCookies() {
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
        await page.goto('https://www.nike.com/register', {
            waitUntil: 'domcontentloaded',
        })

        await page.waitForSelector('[placeholder="Email address"]')
        await cursor.click('[placeholder="Email address"]')
        await page.keyboard.type(userName, {delay: 80})
        cookies = await page.cookies()
        useCookies = cookies.map(cookie => `${cookie.name}=${cookie.value}`).join('; ')
        await browser.close()
        console.log(useCookies)
        return useCookies;
    }catch (err) {
        console.log(err)
    }
}

function signUp() {

}




