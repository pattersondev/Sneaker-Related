const {Worker, isMainThread, parentPort, workerData} = require('worker_threads');
const gmailLogin = require('./utils/login');
const tasks = require('./tasks')
const test = require('./utils/test');
const emails = require('./activities/email')
const youtube = require('./activities/youtube')
const news = require('./activities/news')
const google = require('./activities/google')

if(isMainThread) {

}else {
    
    console.log('hello from worker')
    gmailLogin.login(workerData.gmail.email, workerData.gmail.password, workerData.gmail.proxy).then(async function(browserInfo) {
        console.log('we in it');
        parentPort.postMessage('sleeping in', workerData.sleepAt);
        setTimeout(tasks.sleepBrowser, workerData.sleepIn, workerData.returnIn, browserInfo.browser, workerData.gmail);
        parentPort.postMessage('Checking Emails');
        await emails.checkEmails(browserInfo.page);
        parentPort.postMessage('Sending Emails');
        await emails.sendEmails(browserInfo.page);
        if(Date.now >= workerData.sleepAt) {
            parentPort.postMessage('sleep', workerData.gmail.email);
        }
        let choice = Math.floor(Math.random() * 9 + 1);
        if(choice > 5) {
            //read news
            parentPort.postMessage('Reading News')
            await news.readNews(page)
        }else if(choice < 5) {
            //search google
            parentPort.postMessage('Searching Google')
            await google.google(page)
        }else {
            //view images
        }

        //check sleep time
        if(Date.now >= workerData.sleepAt) {
            parentPort.postMessage('sleep', workerData.gmail.email)
        }

        //watch youtube 1-2 vids
        parentPort.postMessage('Watching Youtube')
        await youtube.watchYT(page);

        if(Date.now === workerData.sleepAt) {
            parentPort.postMessage('sleep', workerData.gmail.email)
        }
        
        
    }).catch(err => {
        console.log('Fatal Error! Stopping.');
    })
    
}