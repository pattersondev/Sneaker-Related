const fs = require('fs');
const { isFunction } = require('util');
const request = require('request')
let credentials;
const puppeteer = require('puppeteer-extra')
const stealth = require('puppeteer-extra-plugin-stealth')
puppeteer.use(stealth())
const request_client = require('request-promise-native');
const privacyCards = [];


/*
    TODO:
    -make cards
    -update cards
    -analytics page
    -tie in the charges on cards to profit tracker?
    -auto profile maker with auto jigging
        AUTO JIGGING HAS PRESETS FOR EACH SITE BASED ON OUR RECOMMENDATIONS
        
*/


//here just bc its conveinient, will run on the apps opening just to create files on first time run.
const firstTime = () => {
    fs.stat('modules\\profile maker\\credentials.json', function(err, stats) {
        console.log(stats)
        if(stats === undefined) {
            const based = {
                "privacy": {

                },
                "eno": {

                },
                "citi": {

                }
            }
            fs.writeFileSync('modules\\profile maker\\credentials.json', JSON.stringify(based), function(err) {
                if(err) throw new Error(err)
                else console.log('wrote credentials file!');
            })
        }
    })
}


const storePrivacyCredentials = (user, pass, name) => {
    credentials = JSON.parse(fs.readFileSync('modules\\profile maker\\credentials.json', 'utf8'));
    console.log(credentials)
    credentials.privacy.name = key;
    fs.writeFile('modules\\profile maker\\credentials.json', JSON.stringify(credentials), function(err) {
        if(err) throw new Error(err);
        console.log('saved new data!')
    })
    
}

const getPrivacyCards = (apikey) => {
    const headers = {
        Authorization: `api-key ${apikey}`
    }

    const options = {
        url: 'https://api.privacy.com/v1/card',
        headers,
        method: 'get'
    }

    request(options, function(error, response, body) {
        console.log(body)
    })
}


const makePrivacyCards = (user, pass, number) => {
    puppeteer.launch({
        defaultViewport: null,
        headless: false
    }).then(async browser => {
        const page = await browser.newPage();
        await page.goto('https://privacy.com/login');
        await page.type('#angular-container > div > div > div.container.-login.ng-scope > form > label.account-field.ng-isolate-scope.-type-email > input', user);
        await page.type('#angular-container > div > div > div.container.-login.ng-scope > form > label.account-field.ng-isolate-scope.-type-password > input', pass);
        await page.click('#angular-container > div > div > div.container.-login.ng-scope > form > button');
        await page.waitForNavigation({
            timeout: 0
        });
        

        if(await page.url() === 'https://privacy.com/tfa') {
            console.log('2fa detected');
            await page.waitForNavigation({
                waitUntil: 'networkidle0',
                timeout: 0
            });


            if(await page.url() === 'https://privacy.com/home') {
                console.log('successfully logged in!')
                await page.setRequestInterception(true)

                page.on('request', (request) => {
                    if(request.url() === 'https://privacy.com/api/v1/card') {
                        console.log('>>', request.method(), request.url(), request.postData())
                    }
                    
                    request.continue()
                })
                page.on('response', async (response) => {
                    if(response.url() === 'https://privacy.com/api/v1/card') {
                        const res = await response.text();
                        console.log(JSON.parse(res));
                        privacyCards.push({
                            pan: JSON.parse(res).card.pan,
                            expMonth: JSON.parse(res).card.expMonth,
                            expYear: JSON.parse(res).card.expYear,
                            cvv: JSON.parse(res).card.cvv
                        })
                    }
                })

                for(let i = 1; i <= number; i++) {
                    console.log('genning card', i)
                    await page.waitForSelector('#home > content > div.home-list-container.ng-isolate-scope > div.home-list.cards.hide-first-card > div.controls._desktop-only > div', {visible: true})
                    await page.click("#home > content > div.home-list-container.ng-isolate-scope > div.home-list.cards.hide-first-card > div.controls._desktop-only > div");
                    await page.waitForSelector("body > div.modal.ng-scope.ng-isolate-scope.in > div > div > div > div.content > div > div > div.buttons > div.create-button.pill-button.ng-scope", {visible: true});
                    await page.click("body > div.modal.ng-scope.ng-isolate-scope.in > div > div > div > div.content > div > div > div.buttons > div.create-button.pill-button.ng-scope");
                    await page.waitFor(1000);
                    await page.goto('https://privacy.com/home')
                }
            }


        }else if(await page.url() === 'https://privacy.com/home') {
            console.log('successfully logged in!')
                await page.setRequestInterception(true)

                page.on('request', (request) => {
                    if(request.url() === 'https://privacy.com/api/v1/card') {
                        console.log('>>', request.method(), request.url(), request.postData())
                    }
                    
                    request.continue()
                })
                page.on('response', async (response) => {
                    if(response.url() === 'https://privacy.com/api/v1/card') {
                        const res = await response.text();
                        console.log(JSON.parse(res));
                        privacyCards.push({
                            pan: JSON.parse(res).card.pan,
                            expMonth: JSON.parse(res).card.expMonth,
                            expYear: JSON.parse(res).card.expYear,
                            cvv: JSON.parse(res).card.cvv
                        })
                    }
                })

                for(let i = 1; i <= number; i++) {
                    console.log('genning card', i)
                    await page.waitForSelector('#home > content > div.home-list-container.ng-isolate-scope > div.home-list.cards.hide-first-card > div.controls._desktop-only > div', {visible: true})
                    await page.click("#home > content > div.home-list-container.ng-isolate-scope > div.home-list.cards.hide-first-card > div.controls._desktop-only > div");
                    await page.waitForSelector("body > div.modal.ng-scope.ng-isolate-scope.in > div > div > div > div.content > div > div > div.buttons > div.create-button.pill-button.ng-scope", {visible: true});
                    await page.click("body > div.modal.ng-scope.ng-isolate-scope.in > div > div > div > div.content > div > div > div.buttons > div.create-button.pill-button.ng-scope");
                    await page.waitFor(1000);
                    await page.goto('https://privacy.com/home')
                }
            
        }
    })
}



makePrivacyCards('william.fitzpatrick2003@gmail.com', 'JP3GM4F!A', 1);

