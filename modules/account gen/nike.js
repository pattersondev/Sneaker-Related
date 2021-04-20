const got = require('got')
const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
var randomstring = require("randomstring")
var random = require('random-name')
puppeteer.use(StealthPlugin())
const fakeUserAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:53.0) Gecko/20100101 Firefox/53.0'
let phone;
let code;

//ArrayList<String> emails;
//ArrayList<String> pass;

function getEmail() {
  let email = randomstring.generate(10) + "@gmail.com"
  //emails.add(email)
  return email;
}

function getPassword() {
  let pass = randomstring.generate(16)
  //pass.add(pass);
  return pass;
}

function getFirstName() {
  return random.first()
}

function getLastName() {
  return random.last();
}

function getBirthDate() {
  month = Math.floor(Math.random() * 10).toString();
  day = Math.floor(Math.random() * 25).toString();
  if (month < 1) {
    month = '1'
  }
  if (day < 10) {
    day = '0' + day;
  }
  year = 2000
  return ('0' + month + day + year);
}
async function getPhoneNumber() {
    const body = await got.post('http://api.getsmscode.com/usdo.php?action=getmobile&username=josephcxo@gmail.com&token=89646fae8df9696c840ca76ff2a6ab62&pid=628', {
      headers: {
        'Charset' : 'UTF-8',
      }
    })
    phone = (body.body)
    console.log(phone)
    return phone;
}

async function getSMSCode() {
  const body = await got.post('http://api.getsmscode.com/usdo.php?action=getsms&username=josephcxo@gmail.com&token=89646fae8df9696c840ca76ff2a6ab62&pid=628&mobile=' + phone, {
    headers: {
      'Charset' : 'UTF-8',
    }
  })
  code = (body.body)
  console.log(code);
  return code;
}
async function nikeAcc () {
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
        await page.setRequestInterception(true);
        page.on('request', (request) => {
        if (['image'].indexOf(request.resourceType()) !== -1) {
            request.abort();
        } else {
            request.continue();
        }
        });
      await page.goto('https://www.nike.com/register',
      { waituntil : 'domcontentloaded',
        referer : 'https://www.nike.com/membership'
    })

      await page.waitForSelector('[value="JOIN US"]')
      await page.focus('[placeholder="Email address"]')
      await page.keyboard.type(getEmail(), {delay: 55})
      await page.focus('[placeholder="Password"]')
      await page.keyboard.type(getPassword(), {delay: 55})
      await page.focus('[placeholder="First Name"]')
      await page.keyboard.type(getFirstName(), {delay: 55})
      await page.focus('[placeholder="Last Name"]')
      await page.keyboard.type(getLastName(), {delay: 55})
      await page.focus('[placeholder="Date of Birth"]')
      await page.keyboard.type(getBirthDate(), {delay: 55})
      await page.keyboard.press("Tab")
      await page.keyboard.press("Tab")
      await page.keyboard.press("Tab")
      await page.keyboard.press("Enter")
      await page.waitForNavigation()

      if(page.url() === 'https://www.nike.com/') {
        console.log('success')
      } else {
        console.log('error')
      }

      await page.goto('https://www.nike.com/member/settings', {
        waituntil: 'domcontentloaded'
      })
      await page.waitForSelector('#settings > div.mex-settings-nav-wrapper.css-1wcynbb > div.mex-settings-nav.ncss-headline-lg-brand.ncss-col-sm-12.pb8-sm.pr6-lg.pl0-sm.va-sm-t.ncss-col-lg-4.css-1xhay01 > div:nth-child(1) > div > div.d-sm-ib.ta-sm-m.headline-5.css-q3cits > div > span')
      await page.click('#settings > div.mex-settings-nav-wrapper.css-1wcynbb > div.mex-settings-nav.ncss-headline-lg-brand.ncss-col-sm-12.pb8-sm.pr6-lg.pl0-sm.va-sm-t.ncss-col-lg-4.css-1xhay01 > div:nth-child(1) > div > div.d-sm-ib.ta-sm-m.headline-5.css-q3cits > div > span')
      await page.waitForSelector('#mobile-container > div > div > form > div.account-form > div.mex-mobile-input-wrapper.ncss-col-sm-12.ncss-col-md-12.pl0-sm.pr0-sm.pb3-sm > div > div > div > div.ncss-col-sm-6.ta-sm-r.va-sm-m.flx-jc-sm-fe.d-sm-iflx > button')
      await page.click('#mobile-container > div > div > form > div.account-form > div.mex-mobile-input-wrapper.ncss-col-sm-12.ncss-col-md-12.pl0-sm.pr0-sm.pb3-sm > div > div > div > div.ncss-col-sm-6.ta-sm-r.va-sm-m.flx-jc-sm-fe.d-sm-iflx > button')
      await page.waitForSelector('#mobile-container > div > div > form > div.account-form > div.mex-mobile-input-wrapper.ncss-col-sm-12.ncss-col-md-12.pl0-sm.pr0-sm.pb3-sm > div > div > div > div.ncss-col-sm-6.ta-sm-r.va-sm-m.flx-jc-sm-fe.d-sm-iflx > button')
      await page.click('#mobile-container > div > div > form > div.account-form > div.mex-mobile-input-wrapper.ncss-col-sm-12.ncss-col-md-12.pl0-sm.pr0-sm.pb3-sm > div > div > div > div.ncss-col-sm-6.ta-sm-r.va-sm-m.flx-jc-sm-fe.d-sm-iflx > button')
      await page.waitForSelector('[placeholder="Mobile Number"]')
      await page.focus('[placeholder="Mobile Number"]')
      await page.keyboard.type(getPhoneNumber())
      await page.focus('[placeholder="Enter Code"]')
      await page.waitFor(15000)
      await page.keyboard.type(getSMSCode())
      await page.click('#progressiveMobile > label')
      await page.click('[value="CONTINUE"]')
    }

nikeAcc();