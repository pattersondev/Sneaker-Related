const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

var firstName = 'Sam'
var lastName = 'Patterson'
var email = 'dadsdastrjgfds@gmail.com'
var password = 'TestPassword123'
const fakeUserAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:53.0) Gecko/20100101 Firefox/53.0'

async function conceptsAcc () {
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
    await page.goto('https://cncpts.com/account/login', 
    { waitUntil: 'domcontentloaded',
      referer: 'https://cncpts.com/'
    })
    await page.waitForSelector('#create_customer > section:nth-child(5) > input')
    await page.focus('#create_customer > section:nth-child(5) > input')
    await page.keyboard.type(firstName)
    await page.focus('#create_customer > section:nth-child(6) > input')
    await page.keyboard.type(lastName)
    await page.focus('#create_customer > section:nth-child(7) > input')
    await page.keyboard.type(email)
    await page.focus('#create_customer > section:nth-child(8) > input')
    await page.keyboard.type(password)
    await page.click('#create_customer > section:nth-child(9) > input')
    await page.waitForNavigation()
    if(page.url() === 'https://cncpts.com/') {
      console.log('success')
    } else if(page.url() === 'https://cncpts.com/challenge') {
      console.log('captcha required')
    } else {
      console.log('error')
    }
    await browser.close()

}

conceptsAcc()