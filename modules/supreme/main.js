const puppeteer = require('puppeteer-extra');
const stealth = require('puppeteer-extra-plugin-stealth')
puppeteer.use(stealth())
const request = require('superagent')
function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
}  
//BOTH BROWSER + DESKTOP MODES!!! (automatically do 50/50)

const init = async () => {
    //make browser
    const browser = await puppeteer.launch({
        headless: false
    })
    
    let page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1')
    // await page.setRequestInterception(true);
    // page.on('request', (request) => {
    //     if (['image', 'stylesheet', 'font'].indexOf(request.resourceType()) !== -1) {
    //         request.abort();
    //     } else {
    //         request.continue();
    //     }
    // });
    await page.goto('https://www.supremenewyork.com/mobile');
    monitor(page, 'stickers,name', 'Accessories');
}


const monitor = async (page, keywords, category) => {
    console.log('monitoring')
    //https://www.supremenewyork.com/mobile_stock.json
    //pass link into atc, then atc
    let kws = keywords.split(',');
    console.log(kws)
    request.get('https://www.supremenewyork.com/mobile_stock.json')
        .set('Host', 'www.supremenewyork.com')
        .set('Connection', 'keep-alive')
        .set('Pragma', 'no-cache')
        .set('User-Agent', 'Mozilla/5.0 (Linux; Android 7.0; SM-G930V Build/NRD90M) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.125 Mobile Safari/537.36')
        .set('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9')
        .set('Accept-Encoding', 'gzip, deflate, br')
        .set('Accept-Language', 'en-US,en;q=0.9')
        .then(res => {
            const products = JSON.parse(res.text).products_and_categories;

            for(const item of products[`${category}`]) {
                console.log(item);
                var found;
                console.log(item.name.toLowerCase())
                if(item.name.toLowerCase().includes(kws[0]) && item.name.toLowerCase().includes(kws[1])) {
                    console.log(`desktop = https://www.supremenewyork.com/shop/${category}/${item.id}`);
                    found = true;
                    atc(page, `https://www.supremenewyork.com/mobile#products/${item.id}`)
                    break;
                }
            }
            if(!found) {
                monitor(page, keywords, category)
            }

        })
}


const atc = async (page, link) => {
    console.log('adding to cart')
    page.goto(link);
    await page.waitForSelector('#cart-update > span')
    await page.click('#cart-update > span')
    var check = await page.evaluate(() => {
        const element = document.querySelector('#checkout-now');
        if(element) {
            return true
        }else {
            return false
        }
    })
    if(check) {
        console.log('atc successful')
        await sleep(500)
        await page.goto('https://www.supremenewyork.com/mobile#checkout')
        checkout(page)
    }else {
        console.log('atc failed')
        atc(page, link)
    }
}


const checkout = async page => {
    await page.waitForSelector('#order_bn')
    await page.type('#order_bn', 'William Fitzpatrick')
    await page.type('#order_email', 'william.fitzpatrick2003@gmail.com')
    await page.type('#order_tel', '2032185161')
    await page.type('#order_billing_address', '6255 Desco Dr.')
    await page.type('#order_billing_address_2', '1a')
    await page.type('#obz', '75225')
    await page.type('#order_billing_city', 'Dallas')
    await page.select('#order_billing_state', 'TX')
    await page.type('#cnid', '1234123412341234')
    await page.select('#credit_card_month', '05')
    await page.select('#credit_card_year', '2026')
    await page.type('#vvv-container > input', '123')
    await page.click('#order_terms')
    sleep(3000).then(await page.click('#submit_button'))
}


//sitekey 6LeWwRkUAAAAAOBsau7KpuC9AV-6J8mhw4AjC3Xz
init()