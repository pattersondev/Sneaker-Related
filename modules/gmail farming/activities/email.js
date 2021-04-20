const checkEmails = async page => {
    await page.goto('https://mail.google.com/mail/u/0/#inbox');
    await page.mouse.click(357, 183);
    console.log('clicking on first email')
    for(let i = 0; i < Math.floor(Math.random() * (5) + 2); i++) {
        console.log('email number ' + i)
        await page.waitFor(Math.floor(Math.random() * (5000) + 5000));
        await page.mouse.click(888, 88);
    }

    await page.mouse.click(99, 86);
    await page.mouse.click(35, 97);

    

    console.log('done with all da emails');
}

const sendEmails = async page => {
    await humanTyping('[name="to"]', 'random ass email here', page);
    await humanTyping('[name="subjectbox"]', 'this is the subject', page);
    await humanTyping('[class="Am Al editable LW-avf tS-tW"][aria-label="Message Body"][role="textbox"]', 'this is the body of da email', page);
}

const humanTyping = async (element, word, page) => {
    for(let i = 0; i < word.length; i++) {
        await page.type(element, word.charAt(i))
        await page.waitFor(100)
    }
}

module.exports = {
    checkEmails: checkEmails,
    sendEmails: sendEmails
};