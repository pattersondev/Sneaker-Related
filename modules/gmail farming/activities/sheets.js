//Travels to google sheets site
function travelToGoogleSheets(page) {
    try {
        (async() => {
            await page.goto('https://google.com');
            page.waitfor(3000)
            await page.type('input.gLFyf.gsfi', 'google sheets');
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

//creatse a blank google sheet
function createSheet() {
    try {
        page.waitfor(5000)
        await page.waitForSelector('#\:1g > div.docs-homescreen-templates-templateview-preview.docs-homescreen-templates-templateview-preview-showcase > img')
        await page.click('document.querySelector("#\\:1g > div.docs-homescreen-templates-templateview-preview.docs-homescreen-templates-templateview-preview-showcase > img")')
    } catch (err) {
        console.log(err)
    }
}


//Fills out a google sheet
async function writeSheet(page) {
    let numberOfRows = math.random() * 10
    let numberOfColumns = math.random() * 5
    try {  
        for(i = 0; i < numberOfRows; i++) {
            page.type(randomwords())
            page.waitFor(500)
            page.keyboard.press('Tab')
            page.waitFor(400)
        }
        for(j = 0; j < numberOfColumns; j++) {
            page.type(randomwords())
            page.waitFor(700)
            page.keyboard.press('Enter')
            page.waitFor(350)
        }
    }catch(err) {
        console.log(err)
    }
}
//Name's a google sheet
async function nameSheet(page) {
    page.waitFor(5000)
    await page.click('document.querySelector("#docs-title-widget > input")')
    page.waitFor(2120)
    await page.type(randomwords())
}
//Runs all necessary sheets tasks in order
async function runSheets(page) {
    travelToGoogleSheets(page)
    createSheet(page)
    writeSheet(page)
    nameSheet(page)
}