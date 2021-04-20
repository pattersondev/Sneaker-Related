//https://www.footlocker.ca/en/order/search

/**
 * @author Sam Patterson
 * @version 01/03/2021
 */

const got = require('got');
const {CookieJar} = require ('tough-cookie')
const {promisify} = require('util')
const { v4: uuidv4 } = require('uuid');
var tu = require('tracking-url');
let csrfToken
let orderNumber = 'V6000538590'
let email = 'garcondeno@gmail.com'
async function orderChecker () {
	const cookieJar = new CookieJar()
	try {
		const response = await got('https://www.footlocker.ca/api/v3/session?timestamp=' + Date.now(), {
			responseType: 'json',
			cookieJar: cookieJar
		}).json()
		csrfToken = response.data.csrfToken
		console.log(csrfToken)
	}catch(err) {
		console.log(err)
	} try {
		const newRes = await got.post('https://www.footlocker.ca/api/users/orders/status?timestamp=' + Date.now(), {
			responseType: 'json',
			cookieJar: cookieJar,
			headers: {
				'x-csrf-token' : csrfToken,
				'accept': 'application/json',
				'accept-encoding': 'gzip, deflate, br',
				'accept-language': 'en-CA,en;q=0.9',
				'cache-control': 'no-cache',
				'content-length': '61',
				'content-type': 'application/json',
				'origin': 'https://www.footlocker.ca',
				'pragma': 'no-cache',
				'referer': 'https://www.footlocker.ca/en/order/search',
				'sec-fetch-dest': 'empty',
				'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-origin',
                'x-api-lang': 'en-CA',
				'user-agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Mobile Safari/537.36',
				'x-fl-request-id': uuidv4()
			},
			body : JSON.stringify({
				'code' : orderNumber,
				'customerEmail' : email
			})
		}).json()
		var product = newRes.lineItems[0].productDescription
		var status = newRes.orderStatus
		var tracking = newRes.shipments[0].trackingNumber
		console.log(product, status)
		if(tu(tracking) !== null) {
			console.log(tu(tracking))
		}
	//	console.log(newRes.data.trackingNumber)
	}catch(err) {
		console.log(err)
	}
}

orderChecker()