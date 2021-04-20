//for google slides automation


//Travel's to google slides
async function travelToSlides(page) {
    try {
        (async() => {
            await page.goto('https://google.com');
            page.waitfor(3000)
            await page.type('input.gLFyf.gsfi', 'google slides');
            page.waitFor(2000)
            page.keyboard.press('Enter')
            await page.waitForSelector('div#resultStats');
            const links = await page.$$('div.r');
            page.waitFor(1230)
            await links[1].click();
        })
    } catch (err) {
        console.log(err);
    }
}
//Creates a new google slide
async function createSlide(page) {
    try {
        page.waitfor(5000)
        await page.waitForSelector('#\:1g > div.docs-homescreen-templates-templateview-preview.docs-homescreen-templates-templateview-preview-showcase > img')
        await page.click('document.querySelector("#\\:1g > div.docs-homescreen-templates-templateview-preview.docs-homescreen-templates-templateview-preview-showcase > img")')
    } catch (err) {
        console.log(err)
    }
}
//Add's new slides with random mouse movement... Haven't figured out how to do the whole adding text thing, text boxes on slides don't have css elements
async function writeSlide(page) {
    let numberOfSlides = math.random() * 10
    let randomX = math.random() * 200
    let randomY = math.random() * 200
    try {
        for(i = 0; i < numberOfSlides; i++) {
            page.waitForSelector('#newSlideButton > div > div > div > div')
            page.waitFor(15000)
            page.click('#newSlideButton > div > div > div > div')
            await page.mouse.move(randomX, randomY)
        }
    } catch(err) {
        console.log(err)
    }
}
//Names the slide
async function nameSlide(page) {
    page.waitFor(5000)
    await page.click('document.querySelector("#docs-title-widget > input")')
    page.waitFor(2120)
    await page.type(randomwords())
}

