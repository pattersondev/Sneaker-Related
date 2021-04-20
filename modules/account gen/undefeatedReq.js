const FormData = require('form-data')
const got = require('got')
const {CookieJar} = require ('tough-cookie')
var first = 'Shombool'
var last = 'mcFack'
var email = 'asdfsdafsdaff@gmail.com'
var pass = 'ouadadjfj22'
const cookieJar = new CookieJar()
var form = new FormData();
form.append('form_type','create_customer')
form.append('utf8', '✓')
form.append('customer[first_name]', first)
form.append('customer[email]', email)
form.append('customer[password]', pass)
async function createAcc() {
    try{
        await got('https://undefeated.com/', {
            cookieJar: cookieJar,
            headers: {
                'user-agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Mobile Safari/537.36',
                'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                'accept-encoding': 'gzip, deflate, br',
                'accept-language': 'en-US,en;q=0.9',
                'cache-control': 'no-cache',
            }
        })
    }catch(err) {
        console.log(err)
    }
    try {
        const {response, statusCode} = await got.post('https://undefeated.com/account', {
            headers: {
                'origin': 'https://undefeated.com',
                'pragma': 'no-cache',
                'referer': 'https://undefeated.com/account/register',
                'sec-fetch-dest': 'document',
                'sec-fetch-mode': 'navigate',
                'sec-fetch-site': 'same-origin',
                'sec-fetch-user': '?1',
                'upgrade-insecure-requests': '1',
                'user-agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Mobile Safari/537.36',
                'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                'accept-encoding': 'gzip, deflate, br',
                'accept-language': 'en-US,en;q=0.9',
                'cache-control': 'no-cache',
                'content-type': 'application/x-www-form-urlencoded'
            },
            body : form
        })
        console.log(response, statusCode)
    }catch(err) {
        console.log(err)
    }
}

createAcc()