//file to control spoof browsers
const {Worker, isMainThread, parentPort, workerData} = require('worker_threads')
const puppeteer = require('puppeteer-extra')
const stealth = require('puppeteer-extra-plugin-stealth')
const fs = require('fs')
const {Webhook, MessageBuilder} = require('discord-webhook-node')
const { worker } = require('cluster')
const hook = new Webhook('https://discordapp.com/api/webhooks/745063220967899156/dT2vsyoOepVWe3cudMIuSBrkw-GcQ2wVMWjlK9Szy2zbDXl_VBbWZJAMTA43wTn3qfr6')
const embed = new MessageBuilder()
.setTitle('**Purpl Passed Splash!**')
.setColor('10224540')
.setThumbnail('https://assets.yeezysupply.com/images/w_937,f_auto,q_auto:sensitive,fl_lossy/809953340cef46c79d5cac1300f25e11_ce49/YEEZY_BOOST_350_V2_ADULTS_ISRAFIL_FZ5421_FZ5421_04_standard.png')
.setDescription('Passed Splash on Browser #1!')
.setTimestamp();


puppeteer.use(stealth())
function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

const useragents = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:53.0) Gecko/20100101 Firefox/53.0',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.79 Safari/537.36 Edge/14.14393',
    'Mozilla/5.0 (compatible, MSIE 11, Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko',
    'Mozilla/5.0 (iPad; CPU OS 8_4_1 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12H321 Safari/600.1.4',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1',
    'Mozilla/5.0 (Linux; Android 6.0.1; SAMSUNG SM-G570Y Build/MMB29K) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/4.0 Chrome/44.0.2403.133 Mobile Safari/537.36',
    'Mozilla/5.0 (Linux; Android 5.0; SAMSUNG SM-N900 Build/LRX21V) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/2.1 Chrome/34.0.1847.76 Mobile Safari/537.36',
    'Mozilla/5.0 (Linux; Android 6.0.1; SAMSUNG SM-N910F Build/MMB29M) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/4.0 Chrome/44.0.2403.133 Mobile Safari/537.36',
    'Mozilla/5.0 (Linux; U; Android-4.0.3; en-us; Galaxy Nexus Build/IML74K) AppleWebKit/535.7 (KHTML, like Gecko) CrMo/16.0.912.75 Mobile Safari/535.7'
]

//functions to control browsers
const closeSelected = () => {
    selectedBrowsers.forEach(browser => {
        threads.forEach(worker => {
            if(worker.workerData.id === browser) worker.terminate()
        })
    })

    
}
const closeAll = () => {
    threads.forEach(worker => {
        worker.terminate()
    })
}
const massLinkChange = link => {
    selectedBrowsers.forEach(browser => {
        browser['page'].goto(link)
    })
}

const detectPass = async (page, session) => {
    //adidas splash pass queue detection
    if(page.url().includes('https://www.adidas')) {
        console.log('this is adidas')
        var check = setInterval(function() {
            console.log('in splash...')
            page.evaluate(() => {
                if(document.getElementsByClassName('gl-cta__content') != null) {
                    document.getElementsByClassName('gl-cta__content').forEach(element => {
                        if(element.innerHTML === 'Add To Bag') {
                            console.log('through splash!')
                            clearInterval(check)
                            session.send('Browser.setWindowBounds', {windowId, bounds: {windowState: 'normal'}});
                            hook.send(embed)
                        }
                    })
                }
            })
        }, 30000)
    }else if(page.url().includes('https://www.yeezysupply.com')) {
        console.log('this is yeezysupply')
        //dont have anything to look for on ys so idk how to detect when splash is passed. will udpate after israfiel or whatever its called
    }else if(page.url().includes('https://www.crocs.com/')) {
        console.log('this is crocs')
        var check = setInterval(function() {
            console.log('in splash...')
            page.evaluate(() => {
                if(document.getElementsByClassName('product-add-btn cx-button cx-button-cta full-width') != null) {
                    document.getElementsByClassName('product-add-btn cx-button cx-button-cta full-width').forEach(element => {
                        if(element.innerHTML === 'Add To Cart') {
                            console.log('through splash!')
                            clearInterval(check)
                            session.send('Browser.setWindowBounds', {windowId, bounds: {windowState: 'normal'}});
                            hook.send(embed)
                        }
                    })
                }
            })
        }, 30000)
    }
}

var currentBrowsers = new Array();
const threads = new Set();
let selectedBrowsers = new Array();

if(isMainThread) {
    let proxies = fs.readFileSync('C:\\Users\\swfit\\Documents\\GitHub\\Purpl\\modules\\spoof browser\\proxies.txt', 'utf8').split('\r\n');
    const browserCount = 1;
    
    for(let i = 0; i < browserCount; i++) {
        threads.add(new Worker(__filename, {workerData: { proxy: proxies[i], id: i, homepage: 'https://www.adidas.com/' } }))
    }

    for(const worker of threads) {
        worker.on('error', (err) => console.log(err))
        worker.on('exit', () => {
            threads.delete(worker)
            currentBrowsers.forEach(browser => {
                if(worker.workerData.id === browser.id) {
                    browser.browser.close()
                }
            })
            console.log('worker deleted')
        })
    }
    

    (async() => {
        console.log('sleeping!')
        await sleep(30000)
        console.log('slep')
        closeAll();
    })();
    


}else {
    (async() => {
        console.log(workerData)
        if(false) {
            let proxy = workerData.proxy
            puppeteer.launch({
                defaultViewport: null,
                headless: false,
                args: ['--proxy-server=' + proxy.split(':')[0] + ':' + proxy.split(':')[1]]
            }).then(async browser => {
                const page = await browser.newPage()
                await page.setUserAgent(useragents[Math.floor(Math.random*9)]);
                //checking if the proxy is an ip auth proxy or not
                if(proxy.indexOf(':') != proxy.lastIndexOf(':')) {
                    await page.authenticate({
                        'username': proxy.split(':')[2],
                        'password': proxy.split(':')[3]
                    });
                }
                await page.goto(homepage)
                const session = await page.target().createCDPSession();
                const {windowId} = await session.send('Browser.getWindowForTarget');
                await session.send('Browser.setWindowBounds', {windowId, bounds: {windowState: 'minimized'}});
                currentBrowsers.push({
                    browser: browser,
                    page: page,
                    id: workerData.id,
                    browserSession: session
                })
                detectPass(page, session)
            })
            
        }else {
            puppeteer.launch({
                defaultViewport: null,
                headless: false
            }).then(async browser => {
                const page = await browser.newPage()
                await page.setUserAgent(useragents[Math.floor(Math.random()*9)]);
                await page.goto(workerData.homepage)
                const session = await page.target().createCDPSession();
                const {windowId} = await session.send('Browser.getWindowForTarget');
                await session.send('Browser.setWindowBounds', {windowId, bounds: {windowState: 'minimized'}});
                currentBrowsers.push({
                    browser: browser,
                    page: page,
                    id: workerData.id,
                    browserSession: session
                })
                if(currentBrowsers[0] === 'dummy') {
                    currentBrowsers.shift();
                }
                detectPass(page, session)
            })
        }
    })()
}






