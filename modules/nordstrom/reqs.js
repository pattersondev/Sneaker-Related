const got = require('got')
const {CookieJar, Store, Cookie} = require ('tough-cookie')
const cookieJar = new CookieJar()

async function doShit() {
    try{
        const {statusCode, response, body} = await got('https://www.nordstrom.com/', {
            cookieJar: cookieJar
        })
        console.log(statusCode, await cookieJar.getCookies())
    }catch(err) {
        console.log(err)
    }
}

doShit()

