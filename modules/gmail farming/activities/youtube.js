//Travels to youtube homepage
const puppeteer = require('puppeteer')
const terms = [
    'nfl',
    'football',
    'covid-19',
    'covid-19 vaccine',
    'covid-19 deaths',
    'denzel curry',
    'a tribe called quest',
    'node js tutorial',
    'html tutorial',
    'frontend development',
    'super smash bros.',
    'ps5',
    'xbox 1 x',
    'nintendo switch'
]

async function travelToYoutube(page) {
    try {
        (async() => {
            await page.goto('https://google.com');
            page.waitfor(3000)
            await page.type('input.gLFyf.gsfi', 'youtube');
            page.waitFor(2000)
            page.keyboard.press('Enter')
            await page.waitForSelector('div#resultStats');
            const links = await page.$$('div.r');
            page.waitFor(1230)
            await links[0].click();
        })
    } catch (err) {
        console.log(err);
    }
}


// searches for random YT video TODO: 
async function watchYT(page) {
    
    const term = terms[Math.floor(Math.random() * (terms.length))];
    console.log(term)
    await page.goto('https://www.youtube.com/');
    await page.waitFor(500)
    console.log('bout to type')
    await page.waitForSelector('#search')
    await humanTyping('[name="search_query"]', term, page);
    await page.waitFor(100)
    await page.keyboard.press('Enter')
    await page.waitFor(1000)

    page.on('console', msg => {
        for (let i = 0; i < msg.args().length; ++i)
        console.log(`${i}: ${msg.args()[i]}`);
    });
    let videos = Math.floor(Math.random() * (5) + 5);
    console.log(videos)
    for(let i = 0; i < 1; i++) {
        console.log('video', i)
        let link = await page.evaluate(async () => {
            try {
                let elements = document.getElementsByClassName('yt-simple-endpoint style-scope ytd-video-renderer');
                console.log(elements)
                let random = Math.floor(Math.random() * (elements.length));
                console.log(random)
                return elements[random].href
            }catch(err) {
                console.log('error encountered! skipping video...', err)
            }
        })
        console.log(link)
        await page.goto(link)
        try {
            if(page.$('#player-overlay\\:1 > div.ytp-ad-player-overlay-instream-info') !== undefined) {
                console.log('ad detected')
                if(page.$('#preskip-component\\:3 > span') !== undefined) {
                    console.log('waiting 5s to skip')
                    await page.waitFor(7500)
                    await page.click('[class="ytp-ad-skip-button ytp-button"]');
                    if(page.$('#player-overlay\\:1 > div.ytp-ad-player-overlay-instream-info') !== undefined) {
                        console.log('ad detected')
                        if(page.$('#preskip-component\\:3 > span') !== undefined) {
                            console.log('waiting 5s to skip')
                            await page.waitFor(7500)
                            await page.click('[class="ytp-ad-skip-button ytp-button"]');
                        }
                    }
                }
            }
        }catch(err) {
            console.log('it is ok.')
        }
        
        let info = await page.$eval('[class="ytp-time-duration"]', (element) => {
            let buttons = document.getElementById('button')
            console.log(buttons)
            let playpause = document.getElementsByClassName('ytp-play-button ytp-button');
            console.log(playpause)
            if(playpause[0].outerHTML.includes('Play (k)')) {
                return {
                    time: element.innerHTML,
                    playing: false
                }
            }else {
                return {
                    time: element.innerHTML,
                    playing: true
                }
            }
            
        })
        console.log(info)
        if(info.playing === false) {
            page.click('[class="ytp-play-button ytp-button"]');
        }else {
            console.log('video is playing')
        }



        if((info.time.split(':').length == 2 && parseInt(info.time.split(':')[0]) <= 10) || info.time.split(':').length == 1) {
            console.log('under 10 minutes, watching all')
            await page.click('[aria-label="Subscribe"]');
            await checktime(page, info.time)
        }else {
            console.log('above 10 minutes, i hate this shit')
            await page.click('[class="style-scope yt-icon-button"]');
            await page.waitFor(646231)
            //TODO: IMPLEMENT LIKE/DISLIKE
            let like = Math.floor((Math.random() * 9) + 1)
            if(like < 5) {
                
                //await page.click('[class="style-scope yt-icon-button"]');
            }else {
                await page.click('[aria-label="Subscribe"]');
                //await page.click('[class="style-scope yt-icon-button"]');
            }
        }
    }
}

//like style-scope ytd-toggle-button-renderer style-text
//dislike style-scope ytd-toggle-button-renderer style-text

const humanTyping = async (element, word, page) => {
    console.log('typing')
    for(let i = 0; i < word.length; i++) {
        await page.type(element, word.charAt(i))
        await page.waitFor(100)
    }
}

const autoScroll = async (page) => {
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if(totalHeight >= scrollHeight){
                    clearInterval(timer);
                    resolve();
                }
            }, 500);
        });
    });
}

const checktime = async (page, time) => {
    page.$eval('[class="ytp-time-current"]', (element) => {
        if(element.innerHTML === time) {
            console.log('video over')
            return true;
        }else {
            setTimeout(checktime(page, time), 30000);
        }
    })
}

module.exports = {
    watchYT: watchYT
}