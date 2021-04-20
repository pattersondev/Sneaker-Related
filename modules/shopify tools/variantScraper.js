/**
 * @author Sam Patterson
 * @version 1/10/2021
 */

const got = require ('got')
let productLink = 'https://www.hanon-shop.com/products/nike-air-force-1-07-lv8-rayguns-cu8070100'

async function getVars () {
    try {
        const {body} = await got.get(productLink + '.json', {
            responseType: 'json',
            headers : {
                'pragma': 'no-cache',
                'sec-fetch-dest': 'document',
                'sec-fetch-mode': 'navigate',
                'sec-fetch-site': 'none',
                'sec-fetch-user': '?1',
                'upgrade-insecure-requests': '1',
                'user-agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36',
                'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                'accept-encoding': 'gzip, deflate, br',
                'accept-language': 'en-US,en;q=0.9',
                'cache-control': 'no-cache'
            }
        })
        var shoe = body.product.title
        var i = 0
        console.log(shoe)
        body.product.variants.forEach(variants => {
            console.log(body.product.variants[i].id + body.product.variants[i].title)
            i++
        });
    }catch (err) {
        console.log(err)
    }
}
getVars()