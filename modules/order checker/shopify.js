/**
 * @author Sam Patterson
 * @version 01/08/2021
 */

const got = require('got')
const {CookieJar} = require ('tough-cookie')
const cheerio = require('cheerio');
let order = 'https://www.dtlr.com/9544204367/checkouts/719eda3c3666ae161149cd82894e05a5?key=9c64f32d00e52edc89a68adb908712ae'
let getSite = order.split('/')
let site = 'https://' + getSite[2]
let logSite = getSite[2]

async function getShopifyTracking() {
    const cookieJar = new CookieJar()
    try{
        await got(site, {
            cookieJar: cookieJar
        })
    }catch(err){
        console.log(err)
    }
    try{
        const {body} = await got(order, {
            headers: {
                'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                'accept-encoding': 'gzip, deflate, br',
                'accept-language': 'en-US,en;q=0.9',
                'cache-control': 'no-cache',
                'pragma': 'no-cache',
                'sec-fetch-dest': 'document',
                'sec-fetch-mode': 'navigate',
                'sec-fetch-site': 'none',
                'sec-fetch-user': '?1',
                'upgrade-insecure-requests': '1',
                'user-agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Mobile Safari/537.36'
            } ,
            cookieJar: cookieJar
        })
        let $ = cheerio.load(body)
        if (order.substring(order.length - 2, order.length) === 'ca') {
            console.log('Order cancelled')
            cancelled = true;
        }
        let tracking = $('.tracking-info__number p a').html()
        if (tracking) {
            console.log(logSite)
            console.log('Shipped')
            console.log(tracking)
        } else {
            let orderStatus = $('.heading-2.os-step__title').html()
            console.log(logSite)
            console.log(orderStatus)
        }
    }catch(err){
        console.log('Something Went Wrong')
        console.log(err)
    }
}

getShopifyTracking()
