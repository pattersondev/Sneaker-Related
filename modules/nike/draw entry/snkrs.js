/**
 * @author Font
 * @version 12/14/2020
 */

const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

var link = 'https://www.nike.com/launch/t/stussy-apparel-collection-ho20?size=M&productId=4321af20-2371-5a67-9f39-2e493c876491'
var firstName = 'Sam'
var lastName = 'Patterson'
var email = 'pattersonrsam@gmail.com'
var password = 'shombooltonshombool'
var creditcard = '4242424242424242'
var exp = '1023'
var cvv = '432'
const fakeUserAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:53.0) Gecko/20100101 Firefox/53.0'

var four = '#root > div > div > div.main-layout > div > div.ncss-col-sm-12.full > div.pdp-container.ncss-col-sm-12.full > div > section > div.ncss-col-sm-12.ncss-col-lg-4.va-sm-t.pt0-sm.pr7-sm.pb0-sm.pl7-sm.pt12-md.pb12-md.pt0-lg.pb0-lg.pl5-lg.mt5-sm.mb3-sm.mt0-lg.mb0-lg.fixie.is-absolute-bottom > aside > div > div.ncss-col-sm-12.mt9-sm > div > ul > li:nth-child(1) > button'
var fourHalf = '#root > div > div > div.main-layout > div > div.ncss-col-sm-12.full > div.pdp-container.ncss-col-sm-12.full > div > section > div.ncss-col-sm-12.ncss-col-lg-4.va-sm-t.pt0-sm.pr7-sm.pb0-sm.pl7-sm.pt12-md.pb12-md.pt0-lg.pb0-lg.pl5-lg.mt5-sm.mb3-sm.mt0-lg.mb0-lg.fixie.is-absolute-bottom > aside > div > div.ncss-col-sm-12.mt9-sm > div > ul > li:nth-child(2) > button'
var five = '#root > div > div > div.main-layout > div > div.ncss-col-sm-12.full > div.pdp-container.ncss-col-sm-12.full > div > section > div.ncss-col-sm-12.ncss-col-lg-4.va-sm-t.pt0-sm.pr7-sm.pb0-sm.pl7-sm.pt12-md.pb12-md.pt0-lg.pb0-lg.pl5-lg.mt5-sm.mb3-sm.mt0-lg.mb0-lg.fixie.is-absolute-bottom > aside > div > div.ncss-col-sm-12.mt9-sm > div > ul > li:nth-child(3) > button'
var fiveHalf = '#root > div > div > div.main-layout > div > div.ncss-col-sm-12.full > div.pdp-container.ncss-col-sm-12.full > div > section > div.ncss-col-sm-12.ncss-col-lg-4.va-sm-t.pt0-sm.pr7-sm.pb0-sm.pl7-sm.pt12-md.pb12-md.pt0-lg.pb0-lg.pl5-lg.mt5-sm.mb3-sm.mt0-lg.mb0-lg.fixie.is-absolute-bottom > aside > div > div.ncss-col-sm-12.mt9-sm > div > ul > li:nth-child(4) > button'
var six = '#root > div > div > div.main-layout > div > div.ncss-col-sm-12.full > div.pdp-container.ncss-col-sm-12.full > div > section > div.ncss-col-sm-12.ncss-col-lg-4.va-sm-t.pt0-sm.pr7-sm.pb0-sm.pl7-sm.pt12-md.pb12-md.pt0-lg.pb0-lg.pl5-lg.mt5-sm.mb3-sm.mt0-lg.mb0-lg.fixie.is-absolute-bottom > aside > div > div.ncss-col-sm-12.mt9-sm > div > ul > li:nth-child(5) > button'
var sixHalf = '#root > div > div > div.main-layout > div > div.ncss-col-sm-12.full > div.pdp-container.ncss-col-sm-12.full > div > section > div.ncss-col-sm-12.ncss-col-lg-4.va-sm-t.pt0-sm.pr7-sm.pb0-sm.pl7-sm.pt12-md.pb12-md.pt0-lg.pb0-lg.pl5-lg.mt5-sm.mb3-sm.mt0-lg.mb0-lg.fixie.is-absolute-bottom > aside > div > div.ncss-col-sm-12.mt9-sm > div > ul > li:nth-child(6) > button'
var seven = '#root > div > div > div.main-layout > div > div.ncss-col-sm-12.full > div.pdp-container.ncss-col-sm-12.full > div > section > div.ncss-col-sm-12.ncss-col-lg-4.va-sm-t.pt0-sm.pr7-sm.pb0-sm.pl7-sm.pt12-md.pb12-md.pt0-lg.pb0-lg.pl5-lg.mt5-sm.mb3-sm.mt0-lg.mb0-lg.fixie.is-absolute-bottom > aside > div > div.ncss-col-sm-12.mt9-sm > div > ul > li:nth-child(7) > button'
var sevenHalf = '#root > div > div > div.main-layout > div > div.ncss-col-sm-12.full > div.pdp-container.ncss-col-sm-12.full > div > section > div.ncss-col-sm-12.ncss-col-lg-4.va-sm-t.pt0-sm.pr7-sm.pb0-sm.pl7-sm.pt12-md.pb12-md.pt0-lg.pb0-lg.pl5-lg.mt5-sm.mb3-sm.mt0-lg.mb0-lg.fixie.is-absolute-bottom > aside > div > div.ncss-col-sm-12.mt9-sm > div > ul > li:nth-child(8) > button'
var eight = '#root > div > div > div.main-layout > div > div.ncss-col-sm-12.full > div.pdp-container.ncss-col-sm-12.full > div > section > div.ncss-col-sm-12.ncss-col-lg-4.va-sm-t.pt0-sm.pr7-sm.pb0-sm.pl7-sm.pt12-md.pb12-md.pt0-lg.pb0-lg.pl5-lg.mt5-sm.mb3-sm.mt0-lg.mb0-lg.fixie.is-absolute-bottom > aside > div > div.ncss-col-sm-12.mt9-sm > div > ul > li:nth-child(9) > button'
var eightHalf = '#root > div > div > div.main-layout > div > div.ncss-col-sm-12.full > div.pdp-container.ncss-col-sm-12.full > div > section > div.ncss-col-sm-12.ncss-col-lg-4.va-sm-t.pt0-sm.pr7-sm.pb0-sm.pl7-sm.pt12-md.pb12-md.pt0-lg.pb0-lg.pl5-lg.mt5-sm.mb3-sm.mt0-lg.mb0-lg.fixie.is-absolute-bottom > aside > div > div.ncss-col-sm-12.mt9-sm > div > ul > li:nth-child(10) > button'
var nine = '#root > div > div > div.main-layout > div > div.ncss-col-sm-12.full > div.pdp-container.ncss-col-sm-12.full > div > section > div.ncss-col-sm-12.ncss-col-lg-4.va-sm-t.pt0-sm.pr7-sm.pb0-sm.pl7-sm.pt12-md.pb12-md.pt0-lg.pb0-lg.pl5-lg.mt5-sm.mb3-sm.mt0-lg.mb0-lg.fixie.is-absolute-bottom > aside > div > div.ncss-col-sm-12.mt9-sm > div > ul > li:nth-child(11) > button'
var nineHalf = '#root > div > div > div.main-layout > div > div.ncss-col-sm-12.full > div.pdp-container.ncss-col-sm-12.full > div > section > div.ncss-col-sm-12.ncss-col-lg-4.va-sm-t.pt0-sm.pr7-sm.pb0-sm.pl7-sm.pt12-md.pb12-md.pt0-lg.pb0-lg.pl5-lg.mt5-sm.mb3-sm.mt0-lg.mb0-lg.fixie.is-absolute-bottom > aside > div > div.ncss-col-sm-12.mt9-sm > div > ul > li:nth-child(12) > button'
var ten = '#root > div > div > div.main-layout > div > div.ncss-col-sm-12.full > div.pdp-container.ncss-col-sm-12.full > div > section > div.ncss-col-sm-12.ncss-col-lg-4.va-sm-t.pt0-sm.pr7-sm.pb0-sm.pl7-sm.pt12-md.pb12-md.pt0-lg.pb0-lg.pl5-lg.mt5-sm.mb3-sm.mt0-lg.mb0-lg.fixie.is-absolute-bottom > aside > div > div.ncss-col-sm-12.mt9-sm > div > ul > li:nth-child(13) > button'
var tenHalf = '#root > div > div > div.main-layout > div > div.ncss-col-sm-12.full > div.pdp-container.ncss-col-sm-12.full > div > section > div.ncss-col-sm-12.ncss-col-lg-4.va-sm-t.pt0-sm.pr7-sm.pb0-sm.pl7-sm.pt12-md.pb12-md.pt0-lg.pb0-lg.pl5-lg.mt5-sm.mb3-sm.mt0-lg.mb0-lg.fixie.is-absolute-bottom > aside > div > div.ncss-col-sm-12.mt9-sm > div > ul > li:nth-child(14) > button'
var eleven = '#root > div > div > div.main-layout > div > div.ncss-col-sm-12.full > div.pdp-container.ncss-col-sm-12.full > div > section > div.ncss-col-sm-12.ncss-col-lg-4.va-sm-t.pt0-sm.pr7-sm.pb0-sm.pl7-sm.pt12-md.pb12-md.pt0-lg.pb0-lg.pl5-lg.mt5-sm.mb3-sm.mt0-lg.mb0-lg.fixie.is-absolute-bottom > aside > div > div.ncss-col-sm-12.mt9-sm > div > ul > li:nth-child(15) > button'
var elevenHalf = '#root > div > div > div.main-layout > div > div.ncss-col-sm-12.full > div.pdp-container.ncss-col-sm-12.full > div > section > div.ncss-col-sm-12.ncss-col-lg-4.va-sm-t.pt0-sm.pr7-sm.pb0-sm.pl7-sm.pt12-md.pb12-md.pt0-lg.pb0-lg.pl5-lg.mt5-sm.mb3-sm.mt0-lg.mb0-lg.fixie.is-absolute-bottom > aside > div > div.ncss-col-sm-12.mt9-sm > div > ul > li:nth-child(16) > button'
var twelve = '#root > div > div > div.main-layout > div > div.ncss-col-sm-12.full > div.pdp-container.ncss-col-sm-12.full > div > section > div.ncss-col-sm-12.ncss-col-lg-4.va-sm-t.pt0-sm.pr7-sm.pb0-sm.pl7-sm.pt12-md.pb12-md.pt0-lg.pb0-lg.pl5-lg.mt5-sm.mb3-sm.mt0-lg.mb0-lg.fixie.is-absolute-bottom > aside > div > div.ncss-col-sm-12.mt9-sm > div > ul > li:nth-child(17) > button'
var twelveHalf = '#root > div > div > div.main-layout > div > div.ncss-col-sm-12.full > div.pdp-container.ncss-col-sm-12.full > div > section > div.ncss-col-sm-12.ncss-col-lg-4.va-sm-t.pt0-sm.pr7-sm.pb0-sm.pl7-sm.pt12-md.pb12-md.pt0-lg.pb0-lg.pl5-lg.mt5-sm.mb3-sm.mt0-lg.mb0-lg.fixie.is-absolute-bottom > aside > div > div.ncss-col-sm-12.mt9-sm > div > ul > li:nth-child(18) > button'
var thirteen = '#root > div > div > div.main-layout > div > div.ncss-col-sm-12.full > div.pdp-container.ncss-col-sm-12.full > div > section > div.ncss-col-sm-12.ncss-col-lg-4.va-sm-t.pt0-sm.pr7-sm.pb0-sm.pl7-sm.pt12-md.pb12-md.pt0-lg.pb0-lg.pl5-lg.mt5-sm.mb3-sm.mt0-lg.mb0-lg.fixie.is-absolute-bottom > aside > div > div.ncss-col-sm-12.mt9-sm > div > ul > li:nth-child(19) > button'
var fourteen = '#root > div > div > div.main-layout > div > div.ncss-col-sm-12.full > div.pdp-container.ncss-col-sm-12.full > div > section > div.ncss-col-sm-12.ncss-col-lg-4.va-sm-t.pt0-sm.pr7-sm.pb0-sm.pl7-sm.pt12-md.pb12-md.pt0-lg.pb0-lg.pl5-lg.mt5-sm.mb3-sm.mt0-lg.mb0-lg.fixie.is-absolute-bottom > aside > div > div.ncss-col-sm-12.mt9-sm > div > ul > li:nth-child(20) > button'
var fifteen = '#root > div > div > div.main-layout > div > div.ncss-col-sm-12.full > div.pdp-container.ncss-col-sm-12.full > div > section > div.ncss-col-sm-12.ncss-col-lg-4.va-sm-t.pt0-sm.pr7-sm.pb0-sm.pl7-sm.pt12-md.pb12-md.pt0-lg.pb0-lg.pl5-lg.mt5-sm.mb3-sm.mt0-lg.mb0-lg.fixie.is-absolute-bottom > aside > div > div.ncss-col-sm-12.mt9-sm > div > ul > li:nth-child(21) > button'

async function sizeEnter() {

  let size = prompt("Enter size (EX: 10.5): ");
  if(size.equals('4')) { 
    size = four
  } else if (size.equals('4.5')) {
    size = fourHalf
  } else if (size.equals('5')) {
    size = five
  } else if(size.equals('5.5')) {
    size = fiveHalf
  } else if(size.equals('6')) {
    size = six
  } else if (size.equals('6.5')) {
    size = sixHalf
  } else if (size.equals('7')) {
    size = seven
  } else if (size.equals('7.5')) {
    size = sevenHalf
  } else if (size.equals('8')) {
    size = eight
  } else if (size.equals('8.5')) {
    size = eightHalf
  } else if (size.equals('9')) {
    size = nine
  } else if (size.equals('9.5')) {
    size = nineHalf
  } else if (size.equals('10')) {
    size = ten
  } else if (size.equals('10.5')) {
    size = tenHalf
  } else if (size.equals('11')) {
    size = eleven
  } else if (size.equals('11.5')) {
    size = elevenHalf
  } else if (size.equals('12')) {
    size = twelve
  } else if (size.equals('12.5')) {
   size = twelveHalf
  } else if (size.equals('13')) {
    size = thirteen
  } else if (size.equals('14')) {
    size = fourteen
  } else if (size.equals('15')) {
    size = fifteen
  } else {
    console.log('INVALID SIZE \n  FOLLOW THIS FORMAT \n FOR SIZE TEN ENTER 10 FOR SIZE TEN AND A HALF ENTER 10.5')
    sizeEnter()
  }
}

size = "M";


async function aco () {
  const browser = await puppeteer.launch({
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

    await page.goto('https://www.nike.com/launch',
     { waituntil : 'domcontentloaded',
       referer : 'https://www.nike.com/'
    })
    await page.waitForSelector('#root > div > div > div.main-layout > div > header > div.d-lg-h.d-sm-b > section > div.right-menu.prl4-sm.prl7-lg.va-sm-m.ta-sm-r > button')
    await page.click('#root > div > div > div.main-layout > div > header > div.d-lg-h.d-sm-b > section > div.right-menu.prl4-sm.prl7-lg.va-sm-m.ta-sm-r > button')
    await page.waitFor(5000)
    await page.waitForSelector('#root > div > div > div.main-layout.no-scroll > nav > ul > li:nth-child(1) > button')
    await page.click('#root > div > div > div.main-layout.no-scroll > nav > ul > li:nth-child(1) > button')
    await page.waitFor(2000)
    await page.focus('[placeholder="Email address"]')
    await page.keyboard.type(email, {delay: 100})
    await page.waitFor(1234)
    await page.focus('[placeholder="Password"]')
    await page.keyboard.type(password, {delay: 100})
    await page.waitFor(1252)
    await page.waitForSelector('[value="SIGN IN"]')
    await page.click('[value="SIGN IN"]')


    
    await page.setUserAgent(fakeUserAgent)
    await page.goto(link, {
      waitUntil : 'domcontentloaded',
      referer : 'https://www.nike.com/launch/'
    })
    await page.waitForSelector(size)
    await page.click(size)
    await page.waitFor(1000)

    await page.waitForSelector('[data-qa="feed-buy-cta"]')
    await page.click('[data-qa="feed-buy-cta"]')
    await page.waitForSelector('#checkout-sections > div.payment-component.mt1-sm > section > header > div.ncss-col-sm-6.va-sm-m.pl0-sm.pr6-sm.pr0-md.text-color-secondary.ta-sm-r > div')
    await page.click('#checkout-sections > div.payment-component.mt1-sm > section > header > div.ncss-col-sm-6.va-sm-m.pl0-sm.pr6-sm.pr0-md.text-color-secondary.ta-sm-r > div')
    await page.waitForSelector('#creditCardNumber')
    await page.focus('#creditCardNumber')
    await page.keyboard.type(creditcard, {delay: 100})
    await page.focus('#expirationDate')
    await page.keyboard.type(exp, {delay: 50})
    await page.focus('#cvNumber')
    await page.keyboard.type(cvv, {delay: 30})
    await page.click('#checkout-sections > div.payment-component.mt1-sm > div > span > span > span > div.mt6-sm.mb6-sm.pr0-sm.pl0-sm.ta-sm-c > button')
    await page.waitForSelector('[data-qa="save-button"]')
    await page.click('[data-qa="save-button"]')


}

aco()
