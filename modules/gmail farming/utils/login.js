//file meant for ONLY logging into gmails
const puppeteer = require('puppeteer-extra');
const stealth = require('puppeteer-extra-plugin-stealth')
puppeteer.use(stealth())
const fs = require('fs');
const { callbackify } = require('util');
const ncp = require('ncp');



//returns directory of where chrome profile is
const login = async (email, password, proxy, path) => {
    return new Promise(async (resolve, reject) => {
        
        const browser = await puppeteer.launch({
            headless: false,
            executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
        })
        const page = await browser.newPage()
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36')
        const navigationPromise = page.waitForNavigation()

        await page.goto('https://accounts.google.com/')

        await navigationPromise
            
        await page.waitForSelector('input[type="email"]')
        await page.click('input[type="email"]')
            
        await navigationPromise
            
        await humanTyping('input[type="email"]', email, page)
            
        await page.waitForSelector('#identifierNext')
        await page.click('#identifierNext')
            
        await page.waitFor(500);
            
        await page.waitForSelector('#password > div.aCsJod.oJeWuf > div > div.Xb9hP > input')
        await page.click('input[type="email"]')
        await page.waitFor(500);
            
        await humanTyping('input[type="password"]', password, page)
        await page.waitForSelector('#passwordNext')
        await page.click('#passwordNext')
            
        await page.waitFor(2500)
        if(page.url().includes('https://myaccount.google.com/')) {
            console.log('Login Successful!')
            await page.goto('chrome://version')
            let temp = await page.evaluate(() => document.getElementById('profile_path').innerHTML);
            let userDataDir = temp.split('\\Default')[0]
            browser.close()
            resolve(userDataDir)
        }else {
            let bodyHTML = await page.evaluate(() => document.body.innerHTML);
    
            //TODO: add recovery email/question
            if(bodyHTML.includes('2-Step Verification')) {
                console.log('2FA Decected. Manual Login Required.')
                console.log('waiting')
                await page.waitForNavigation();
                if(page.url().includes('myaccount.google.com')) {
                    resolve({
                        browser: browser,
                        page: page
                    });
                }else {
                    console.log('something went wrong! aborting');
                    reject('Login Error Occured.');
                }
                    
            }else {
                console.log('Password Incorrect! Stopping...')
                browser.close()
                reject('Password Incorrect!')
            }
        }
    })
    
}


const humanTyping = async (element, word, page) => {
    for(let i = 0; i < word.length; i++) {
        await page.type(element, word.charAt(i))
        await page.waitFor(100)
    }
}


module.exports = {
    login: login
}