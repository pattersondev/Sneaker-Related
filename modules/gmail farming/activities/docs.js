function numberOfWords() {
    let wordCount = math.random() * 27;
    return wordCount
}



const travelToGoogleDocs = async page => {
    try {
        (async() => {
            await page.goto('https://google.com');
            page.waitfor(3000)
            await page.type('input.gLFyf.gsfi', 'google docs');
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



//Creates A Blank Google Doc
const createDoc = async page => {
    try {
        page.waitfor(5000)
        await page.waitForSelector('#\:1g > div.docs-homescreen-templates-templateview-preview.docs-homescreen-templates-templateview-preview-showcase > img')
        await page.click('document.querySelector("#\\:1g > div.docs-homescreen-templates-templateview-preview.docs-homescreen-templates-templateview-preview-showcase > img")')
    } catch (err) {
        console.log(err)
    }
}


//Types random words in google doc
const typeDoc = async page => {
    let wordCount = numberOfWords()
    for(i = 0; i < wordCount; i++) {
        if(i / 2 == 1) {
            page.type(randomwords(wordCount))
            page.waitFor(1000)
        }
    }
}


//Names the google doc
const nameDoc = async page => {
    page.waitFor(5000)
    await page.click('document.querySelector("#docs-title-widget > input")')
    page.waitFor(2120)
    await page.type(randomwords())
    return;
}

//TODO: need to test
const shareDoc = async (page, gmails) => {
    let randomGmail = Math.random() * (gmails.length - 1)

    await page.click('#docs-titlebar-share-client-button > div')
    await page.waitFor(500)
    await page.type('#_c707', gmails[randomGmail]['email'])
    await page.waitFor(500)
    await page.click("#c4 > div > div > div > div > div > div:nth-child(2) > div.boqDrivesharedialogCommonButtonbarButtonBar > div > div.boqDrivesharedialogCommonButtonbarShareActions > button.mdc-button.mdc-button--unelevated.GmFillButton.GmFillButtonDarkTheme.GmTextLabelButton.boqDrivesharedialogCommonButtonbarDoneButton > div")
}




