/**
 * 
 * @author Sam Patterson
 * @version 12/27/2020
 */
const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())
const fakeUserAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:53.0) Gecko/20100101 Firefox/53.0'
var prodUrl = 'https://www.nike.com/launch/t/air-jordan-13-starfish'
async function findDate () {
    try {
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
        await page.setRequestInterception(true);
        page.on('request', (request) => {
            if (['image'].indexOf(request.resourceType()) !== -1) {
                request.abort();
            } else {
                request.continue();
            }
        });
        await page.goto(prodUrl, {
            waitUntil: 'domcontentloaded'
        })

        //grabs time from the launch page

        await page.waitForSelector('#root > div > div > div.main-layout > div > div.ncss-col-sm-12.full > div.pdp-container.ncss-col-sm-12.full > div > section.card-product-component.ncss-row.bg-white.mt0-sm.mb2-sm.mt7-lg.mb7-md.show-product > div.ncss-col-sm-12.ncss-col-lg-4.va-sm-t.pt0-sm.pr7-sm.pb0-sm.pl7-sm.pt12-md.pb12-md.pt0-lg.pb0-lg.pl5-lg.mt5-sm.mb3-sm.mt0-lg.mb0-lg.fixie > aside > div > div.product-info.ncss-col-sm-12.full > div.test-available-date > div')
        const innerText = await page.evaluate(() => document.querySelector('#root > div > div > div.main-layout > div > div.ncss-col-sm-12.full > div.pdp-container.ncss-col-sm-12.full > div > section.card-product-component.ncss-row.bg-white.mt0-sm.mb2-sm.mt7-lg.mb7-md.show-product > div.ncss-col-sm-12.ncss-col-lg-4.va-sm-t.pt0-sm.pr7-sm.pb0-sm.pl7-sm.pt12-md.pb12-md.pt0-lg.pb0-lg.pl5-lg.mt5-sm.mb3-sm.mt0-lg.mb0-lg.fixie > aside > div > div.product-info.ncss-col-sm-12.full > div.test-available-date > div').innerText);
        console.log(innerText)
        await browser.close()
        
        //String manipulation for date

        launchTime = innerText.toString()
        launchTime = launchTime.replace('Available ', '')
        launchTime = launchTime.replace(' at', '')
        launchTime = launchTime.split(' ')
        if (launchTime[0[0]] !== 1 && launchTime[0[1]] !== '/') {
            launchTime[0] = '0' + launchTime[0]  + '/2021'
        }
        if (launchTime[3] === 'PM') {
            launchTime[2] = launchTime[2].replace(':00', '')
            launchTime[2] = parseInt(launchTime[2]) + 12
            launchTime[2] = launchTime[2].toString()
            launchTime[2] = launchTime[2] + ':00'
        }
        launchTime[3]
        launchTime[1] = '00:' + launchTime[1]
        launchTime[0] = launchTime[0].replace('/', '-')
        var launchString = launchTime[0] + ' ' + launchTime[1]
        var fullLaunchDate = new Date(launchString)
        console.log(fullLaunchDate)
    } catch(err) {
        console.log(err)
    }
}

findDate()

