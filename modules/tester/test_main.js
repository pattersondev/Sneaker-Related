const fs = require('fs');
const request = require('request')


let proxies = fs.readFileSync('modules\\tester\\proxies.txt', 'utf8').split('\r\n');
let chunks = [];
let completed = 0;
let chunksCompleted = 0;
const times = {};

const breakProxies = () => {
    const fullChunks = Math.floor(proxies.length / limit);
    const lastChunk = proxies.length % limit;
  
    for (let i = 0; i < fullChunks; i += 1) {
      chunks.push(proxies.slice(i * limit, i * limit + limit));
    }
  
    chunks.push(proxies.slice(fullChunks * limit, fullChunks * limit + lastChunk));
};

const test = (ip, site) => {
    const headers = {
        Host: site,
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0 Safari/605.1.15',
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US',
        'Accept-Encoding': 'br, gzip, deflate',
        Connection: 'keep-alive',
    };

    const options = {
        url: site,
        headers,
        method: 'get',
        gzip: true,
        resolveWithFullResponse: true,
        proxy: `http://${ip}`
    }

    request(options, function(error, response, body) {
        if(error.code === 'ECONNRESET') {
            console.log('proxy authentication required')
        }else if(!error) {
            console.log('status: ', response.statusCode);
            console.log(`${ip} good!`)
        }
        
    })
}

test('108.165.12.61:12229', 'https://www.yeezysupply.com/');
