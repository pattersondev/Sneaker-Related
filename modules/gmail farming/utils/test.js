//file holding functions to test recap


const puppeteer = require('puppeteer');

//Tests regular recapV2
const testCaptchaV2 = async page => {
    if(!page) {
        const browser = await puppeteer.launch({ headless: false})
        const page = await browser.newPage()
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36')
        await page.goto('https://recaptcha-demo.appspot.com/recaptcha-v2-checkbox.php')
        await page.waitForSelector('#recaptcha-anchor > div.recaptcha-checkbox-border')
        await page.click('#recaptcha-anchor > div.recaptcha-checkbox-border')
        if('document.querySelector("#recaptcha-anchor > div.recaptcha-checkbox-checkmark")') {
            console.log('One Click Successful!')
        } else {
            console.log('Your gmail blows cock lmao idiot')
        }
    }else {
        await page.goto('https://recaptcha-demo.appspot.com/recaptcha-v2-checkbox.php')
        await page.waitForSelector('#recaptcha-anchor > div.recaptcha-checkbox-border')
        await page.click('#recaptcha-anchor > div.recaptcha-checkbox-border')
        if('document.querySelector("#recaptcha-anchor > div.recaptcha-checkbox-checkmark")') {
            console.log('One Click Successful!')
        } else {
            console.log('Your gmail blows cock lmao idiot')
        }
    }
    
}

//Tests invis recapV2
const testCaptchaInvis = async page => {
    if(!page) {
        const browser = await puppeteer.launch({ headless: false})
        const page = await browser.newPage()
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36')
        await page.goto('https://recaptcha-demo.appspot.com/recaptcha-v2-checkbox-explicit.php')
        await page.waitForSelector('#recaptcha-anchor > div.recaptcha-checkbox-border')
        await page.click('#recaptcha-anchor > div.recaptcha-checkbox-border')
        if('document.querySelector("#recaptcha-anchor > div.recaptcha-checkbox-checkmark")') {
            console.log('One Click Successful!')
        } else {
            console.log('Your gmail blows cock lmao idiot')
        }
    }else {
        await page.goto('https://recaptcha-demo.appspot.com/recaptcha-v2-checkbox-explicit.php')
        await page.waitForSelector('#recaptcha-anchor > div.recaptcha-checkbox-border')
        await page.click('#recaptcha-anchor > div.recaptcha-checkbox-border')
        if('document.querySelector("#recaptcha-anchor > div.recaptcha-checkbox-checkmark")') {
            console.log('One Click Successful!')
        } else {
            console.log('Your gmail blows cock lmao idiot')
        }
    }
    
}



//test v3
const testRecapV3 = async (userdata, callback) => {
    const browser = await puppeteer.launch({
        headless: false,
        executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
        args:[
            `--user-data-dir=${userdata}`]
    })
    const page = await browser.newPage()
    await page.goto('https://recaptcha-demo.appspot.com/recaptcha-v3-request-scores.php')
    await page.waitForXPath('//*[@id="recaptcha-steps"]/li[4]/pre');
    let scoreElement = await page.$x('//*[@id="recaptcha-steps"]/li[4]/pre[1]');
    await page.waitFor(1500)
    let score1 = await page.evaluate(el => el.textContent, scoreElement[0])
    browser.close()
    callback(JSON.parse(score1).score)
}



module.exports = {
    testCaptchaV2: testCaptchaV2,
    testCaptchaInvis: testCaptchaInvis,
    testRecapV3: testRecapV3
}