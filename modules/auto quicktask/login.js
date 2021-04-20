const puppeteer = require('puppeteer-extra')
const stealth = require('puppeteer-extra-plugin-stealth')
puppeteer.use(stealth());
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

const login = async () => {
    const browser = await puppeteer.launch({
        headless: false,
        executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
    });

    const page = await browser.newPage();
    await page.goto('https://discord.com/login');
    await page.waitForNavigation();
}

login();
