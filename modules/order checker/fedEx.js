/**
 * @author Sam Patterson
 * @version 01/05/2021
 */
const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())
var tracking = '61292700893529171948'


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

    if (tracking.substring(0, 2) === '61') {
        try {
            await page.goto('https://www.fedex.com/en-us/tracking.html')
            await page.waitForSelector('#track_inbox_track_numbers_area')
            await page.focus('#track_inbox_track_numbers_area')
            await page.keyboard.type(tracking)
            await page.click('#number > div > form > div > div > form > div.trackByTrackInboxTVC.single > div > button')
            await page.waitForSelector('#container > div > div > div.trackingRootViewMain_TrackingView > div > div.tvc_detailPage_area > div:nth-child(2) > div.tvc_trackDetailView_area > div > div.trackDetailViewController_area.trackDetailSection > div > div.dp_snapshot_area > div > div.redesignSnapshotTVC.fxg-wrapper.container > h1 > div.redesignSnapshotTVC.snapshotController_date.dest')
            const orderStatus = await page.evaluate(() => document.querySelector('#container > div > div > div.trackingRootViewMain_TrackingView > div > div.tvc_detailPage_area > div:nth-child(2) > div.tvc_trackDetailView_area > div > div.trackDetailViewController_area.trackDetailSection > div > div.dp_snapshot_area > div > div.redesignSnapshotTVC.fxg-wrapper.container > h1 > div.redesignSnapshotTVC.snapshotController_date.dest').innerText);
            console.log(orderStatus)
            await browser.close()
        } catch (err) {
            await browser.close()
            console.log(err)
        }
    }
}

checkOrder()