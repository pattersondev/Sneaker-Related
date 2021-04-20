/**
 * @author Sam Patterson
 * @version 01/05/2021
 */
const got = require('got');
const cheerio = require('cheerio');
var tracking = '9405511202555523040701'
async function checkStatus () {
    try{
        const {body, statusCode} = await got.get('https://www.parcelmonitor.com/en/track-it-online/?pParcelIds=' + tracking,  {
            followRedirect: false,
            headers: {
                'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                'accept-encoding': 'gzip, deflate, br',
                'accept-language': 'en-US,en;q=0.9',
                'if-none-match': 'W/"228d-jgCKjNaX6t9VnoXhlWKgXY2ZIsA"',
                'referer': 'https://www.parcelmonitor.com/en/',
                'sec-fetch-dest': 'document',
                'sec-fetch-mode': 'navigate',
                'sec-fetch-site': 'same-origin',
                'sec-fetch-user': '?1',
                'upgrade-insecure-requests':' 1',
                'user-agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Mobile Safari/537.36'
            }
        })
        let $ = cheerio.load(body)
        let status = $('#parcel-9405511202555523040701-uspsgl > div.parcel-box-body.delivered > div > div > div.parcel-short-info.clearfix.uPadding-pp-desktop-base.uBorder-top > pp-tracking-result-last-event > div > div:nth-child(2) > div > div > p.pp-cms-primary-text_color.weight-bold > span.ng-scope').text()
        console.log(status)
        console.log(body, statusCode)
    }catch(err) {
        console.log(err)
    }
}

checkStatus()