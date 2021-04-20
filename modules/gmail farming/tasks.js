//meant to handle all gmail tasks
const {Worker, isMainThread, parentPort} = require('worker_threads');
const gmailLogin = require('./utils/login');
const test = require('./utils/test');
const fs = require('fs');
const csv = require('csv-stringify');
const { stringify } = require('querystring');
const path = require('path');

//gmails loaded into the bot
let activeGmails = new Array();

//max amount of running gmails
const maxRunning = 10;

//user input for sleep time amounts (minutes)
const sleepinputlow = 300;
const sleepinputhigh = 480;

//user input for run time amounts (minutes)
const runinputlow = 30;
const runinputhigh = 60;


//queued gmails
let queued = new Array();
const threads = new Set();
const interests = [
    'gaming',
    'cooking',
    'tech',
    'fashion',
    'shoes'
]

if(fs.existsSync('gmails.json')) {
    let temp = require('C:\\Users\\swfit\\Documents\\GitHub\\Purpl\\gmails.json');
    if(Array.isArray(temp)) {
        temp.forEach(element => {
            activeGmails.push(element);
        })
    }else {
        activeGmails.push(temp);
    }
}



const newGmail = async (email1, pass, proxy, recovery) => {
    const testv3OnAdd = false;
    console.log(activeGmails);
    if(!proxy) {
        let proxy = 'localhost';
    }
    if(testv3OnAdd) {
        let gmail = {
            email: email1,
            password: pass,
            recovery: '',
            proxy: '',
            runs: 0,
        }
        await test.testRecapV3(gmail.userdata, (score) => {
            gmail.v3 = score;
        })
        
        if(proxy) {
            gmail.proxy = proxy;
        }  else {
            gmail.proxy = 'localhost';
        } 
        if(recovery) gmail.recovery = recovery;

        console.log(gmail);
        return gmail;
    }else {
        let gmail = {
            email: email1,
            password: pass,
            recovery: '',
            proxy: '',
            runs: 0
        }

        if(proxy) {
            gmail.proxy = proxy
        }  else {
            gmail.proxy = 'localhost';
        } 
        if(recovery) gmail.recovery = recovery;

        console.log(gmail);
        if(fs.existsSync('gmails.json')) {
            console.log('file exists');
            activeGmails.push(gmail)
            fs.writeFileSync('gmails.json', JSON.stringify(activeGmails))
        }else {
            fs.writeFileSync('gmails.json', JSON.stringify(gmail), (err) => {
                console.log(err)
            })
        }
    }
}






const startAll = async () => {
    if(isMainThread) {
        
        for(const gmail of activeGmails) {
            if(queueCheck()) {
                queued.push(gmail);
            }else {
                threads.add(new Worker(path.join(__dirname, 'controller.js'), {workerData: {gmail: gmail, sleepAt: Math.floor(Math.random() * (2) + 9) } }));
            }
        }

        for(let worker of threads) {
            worker.on('error', (err) => console.log(err))
            worker.on('exit', () => {
                threads.delete(worker)
                console.log('worker deleted');
            })
            worker.on('message', (message) => {
                console.log('from the parent: ' + message)
                if(message.substring(0, 5) === sleep) {
                    //handle sleep
                }else {
                    //task status
                }
            })
        }

        
    }else {
        const browser = await puppeteer.launch({
            headless: false,
            executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
            args:[
                `--user-data-dir=${workerData.gmail.userdata}`]
        })
        const page = await browser.newPage()
        runningGmails.push({
            'email': workerData.gmail.email,
            'browser': browser,
            'page': page
        })
    }
}

const sleepBrowser = (time, browser, gmail) => {
    pullFromQueue();
    queued.push(gmail);
    browser.close();
    setTimeout(startSpecific, time, gmail);
}

const startSpecific = gmail => {
    console.log('starting gmail...')
    //starts a specific gmail, method here to reduce clutter in task structure
    if(queueCheck()) {
        console.log('queued!')
        queued.push(gmail);
    }else {
        //sleepIn is how long until browser will be slept
        //returnIn is how long browser will be slept for
        threads.add(new Worker(path.join(__dirname, 'controller.js'), {workerData: {gmail: gmail, sleepIn: Math.floor(Math.random() * ((runinputhigh * 60000) - (runinputlow * 60000) + (runinputlow * 60000))), returnIn: Math.floor(Math.random() * ((sleepinputhigh * 60000) - (sleepinputlow * 60000) + (sleepinputlow * 60000))) }}));
    }
}

const stopSpecific = gmail => {
    console.log('stopping ' + gmail.email);
    for(const worker of threads) {
        if(worker.workerData.gmail === gmail.gmail) {
            worker.terminate();
            threads.delete(worker);
            pullFromQueue();
            break;
        }
    }
}

const stopAll = () => {
    console.log('stopping all')
    for(const worker of threads) {
        worker.terminate();
        threads.delete(worker);
    }
}

const queueCheck = () => {
    //check to see if there is already max number of browsers running, if so it returns true to queue the browser
    console.log('checking queue...')
    if(threads.size >= maxRunning) {
        console.log('queued.')
        return true;
    }else {
        console.log('good to go!')
        return false;
    }
}

const pullFromQueue = () => {
    console.log('pulling gmail from q')
    const unqueued = queued.shift();
    startSpecific(unqueued);
}

// if(isMainThread) {
//     console.log('this is the issue')
//     startSpecific(activeGmails[0]);
//     //newGmail('22fitzpatrickw@smtexas.org', 'Lions123', '');
// }


const exportGmails = () => {
    
    let base = 'EMAIL,PASSWORD,RECOVERY EMAIL,PROXY\n'
    activeGmails.forEach(gmail => {
        base += `${gmail.email},${gmail.password},${gmail.recovery},${gmail.proxy}\n`
    })
    let dateob = new Date()
    fs.writeFile(`exports\\gmails\\gmails (${dateob.getFullYear()}-${("0" + (dateob.getMonth() + 1)).slice(-2)}-${("0" + dateob.getDate()).slice(-2)}).csv`, base, function(err) {
        if(err) throw new Error(err)
    })
    

    require('child_process').exec('start "" "exports\\gmails"');
}


module.exports = {
    sleepBrowser: sleepBrowser
}
