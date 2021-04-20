const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

var firstName = 'Sam'
var lastName = 'Patterson'
var email = 'shofdaflfacdfseMcgee@gmail.com'
var password = 'TestPassword123'
const fakeUserAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:53.0) Gecko/20100101 Firefox/53.0'

async function undefeatedAcc () {
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
    await page.goto('https://undefeated.com/account/register', 
    { waitUntil: 'domcontentloaded',
      referer: 'https://undefeated.com/account/'
    })
    await page.waitForSelector('#CreatePassword')
    await page.type('#FirstName', firstName)
    await page.type('#LastName', lastName)
    await page.type('#Email', email)
    await page.keyboard.press("Tab");
    await page.keyboard.type(password)
    await page.keyboard.press("Tab");
    await page.keyboard.press("Enter");
    await page.waitForNavigation()

    if(page.url() === 'https://undefeated.com/') {
      console.log('success')
    } else if(page.url() === 'https://undefeated.com/challenge') {
      console.log('captcha required')
    } else {
      console.log('error')
    }
    

}

undefeatedAcc()
