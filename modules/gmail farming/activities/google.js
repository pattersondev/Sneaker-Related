const { PuppeteerExtra } = require("puppeteer-extra");

//Random google search, clicks on second result then scrolls down the page
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




async function randomSearch(page) {
    
    const term = terms[Math.floor(Math.random() * (terms.length))];
    await page.goto('https://google.com');
    await page.waitFor(500)
    await humanTyping('input.gLFyf.gsfi', term, page);
    await page.waitFor(100)
    await page.keyboard.press('Enter')
    await page.waitForNavigation();

    page.on('console', msg => {
        for (let i = 0; i < msg.args().length; ++i)
        console.log(`${i}: ${msg.args()[i]}`);
    });
    let searches = Math.floor(Math.random() * (5) + 5);
    console.log(searches)
    for(let i = 0; i < searches; i++) {
        console.log('search', i)
        let link = await page.evaluate(() => {
            try {
                console.log('test')
                let elements = document.getElementsByClassName('g');
                console.log(elements)
                let random = Math.floor(Math.random() * (elements.length));
                console.log(random)
                if(elements[random].children[1] === undefined) {
                    let link = elements[random].children[0].children[0].innerHTML.split(' ')[1].split('"')[1]
                    console.log(link)
                    return link;
                }else {
                    let link = elements[random].children[1].children[0].innerHTML.split(' ')[1].split('"')[1]
                    console.log(link)
                    return link;
                }
            }catch(err) {
                console.log('error encountered! skipping search...')
            }
        })
        try {
            console.log(link)
            const page2 = await browser.newPage();
            await page2.goto(link);
            await autoScroll(page2);
            console.log('scrolled')
            page2.close();
        }catch(err) {
            console.log('err occured! skipping article...', err)
            page2.close();
        }
        
    }        
    
}
//Scrolls down page on an interval
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

const humanTyping = async (element, word, page) => {
    for(let i = 0; i < word.length; i++) {
        await page.type(element, word.charAt(i))
        await page.waitFor(100)
    }
}