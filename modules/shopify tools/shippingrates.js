const got = require('got')
const {CookieJar} = require ('tough-cookie')
var zipCode = '20148'
var state = 'VA'
var country = 'US'
var phone = '5712221342'
var prodUrl = 'https://undefeated.com/collections/all/products/lebron-viii-courtpurple-universitygold?variant=31895567990857'
var site = prodUrl.split('/')[2]
const cookieJar = new CookieJar()
var FormData = require('form-data');
var form = new FormData();
form.append('id', '19439274918016')
form.append('form_type', 'product')
form.append('utf8', '✓')
console.log(site)
async function getRates() {
    try{
        await got.get('https://undefeated.com/', {
            cookieJar: cookieJar
        })
    } catch (err) {
        console.log(err)
    }
    try {
        await got.post('https://undefeated.com/cart/add.js', {
            cookieJar: cookieJar,
            headers: {
                'user-agent': 'Chrome'
            },
            body : form
        })
    }catch(err) {
        console.log(err)
    }
    try {
        await got('https://undefeated.com/checkout', {
            cookieJar: cookieJar,
            headers: {
                'user-agent': 'Chrome'
            }
        })
    } catch (err) {
        console.log(err)
    }
    try {
        const {body} = await got('https://undefeated.com/cart/shipping_rates.json?shipping_address[zip]=' + zipCode + '&shipping_address[country]=' + country + '&shipping_address[province]=' + state, {
            responseType: 'json',
            headers: {
                'user-agent': 'Chrome'
            },
            cookieJar: cookieJar,
        })
        var name = body.shipping_rates[0].name
        name = name.replace(' ', '%20')
        name = name.replace(' ', '%20')
        name = name.replace(' ', '%20')
        name = name.replace(' ', '%20')
        name = name.replace(' ', '%20')
        let rateToken = name + '-' + body.shipping_rates[0].price
        console.log(rateToken)
    }catch(err) {
        console.log(err)
    }
}
getRates()
