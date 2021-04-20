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


const images = async () => {
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();
    const term = terms[Math.floor(Math.random() * (terms.length))];
    await page.goto('https://www.google.com/imghp?hl=EN');
    await page.waitFor(500)
    await humanTyping('input.gLFyf.gsfi', term, page);
    await page.waitFor(100)
    await page.keyboard.press('Enter')
    await page.waitForNavigation();
    let dim = await page.evaluate(() => {
        let elements = document.getElementsByClassName('isv-r PNCib MSM1fd BUooTd');
        let random = Math.floor(Math.random() * (elements.length));
        console.log(random)
        let rect = elements[random].getBoundingClientRect();
        console.log(elements[random]);
        return {
            element: elements[random],
            top: rect.top,
            right: rect.right,
            bot: rect.bottom,
            left: rect.left
        }
    });
    console.log(dim);
    let temp = dim.bot;
    await autoScroll(page, temp);
    
}

const autoScroll = async (page, height) => {
    await page.evaluate(height.toString(), async (height) => {
        console.log('hello!')
        //height = parseInt(height)
        console.log(height)
        var totalHeight = 0;
        var distance = 100;
        var timer = setInterval(() => {
            var scrollHeight = 4000;
            window.scrollBy(0, distance);
            totalHeight += distance;

            if(totalHeight >= scrollHeight){
                clearInterval(timer);
                resolve();
            }
        }, 500);
    });
}

const humanTyping = async (element, word, page) => {
    for(let i = 0; i < word.length; i++) {
        await page.type(element, word.charAt(i))
        await page.waitFor(100)
    }
}

const scrollTo = async (x,y, page) => {
    return page.evaluate((_x, _y)=> {    
        window.scrollTo(parseInt(_x || 0, 10), parseInt(_y || 0, 10));
    }, x, y);
}

images();