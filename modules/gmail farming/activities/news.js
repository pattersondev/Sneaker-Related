const puppeteer = require('puppeteer')

module.exports = async function readNews(page) {
    

    let articles = Math.floor(Math.random() * (5) + 5);
    console.log(articles)
    for(let i = 0; i < articles; i++) {
        console.log('article #', i)
        await page.goto('https://news.google.com/')
        let link = await page.evaluate(() => {
            let elements = document.getElementsByClassName('VDXfz');
            let random = Math.floor(Math.random() * (elements.length));
            console.log(random)
            let link = elements[random].href
            console.log(link)
            return link;
            let rect = elements[random].getBoundingClientRect();
            console.log(rect.top, rect.right, rect.bottom, rect.left);
        
        })

        const page2 = await browser.newPage();
        await page2.goto(link)
        await autoScroll(page2);
        console.log('scrolled!')
        page2.close();
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

