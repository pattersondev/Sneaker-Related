const randomstring = require('randomstring')
const request = require('request')
const token = 'mfa.JpVhCl6xZ96d4gDxnPyV8Lgbf_hLETPFVSQ2J-0TVnLvTSYh6U3pcXRj9blkPsIxl7kd9daZbzZYodcweQ56'

const groups = {
    mrkt: '527703858114199552',
    botmart: '430087124876918798',
    tidal: '500010617113935883',
    didi: '594010666554097664',
    tiger: '721742841570787338',
}

const channels = {
    mrkt: {
        adept: {
            wts: '640756538549600277',
            wtb: '640760156568944643',
            wtr: '762944961863483403',
            wtro: '762944874622222356'
        },
        balko: {
            wts: '640756983108206597',
            wtb: '640760226785656832',
            wtr: '722215383205150840',
            wtro: '722215300266721412'
        },
        cyber: {
            wts: '640757033200517160',
            wtb: '640760274399526912',
            wtr: '722215500335284325',
            wtro: '722215467019796521'
        },
        dashe: {
            wts: '640757145112936480',
            wtb: '640760311162470410',
            wtr: '722215670959570984',
            wtro: '722215640391483413'
        },
        estock: {
            wts: '775054393712181278',
            wtb: '775054442294804490',
            wtr: '775054538981113866',
            wtro: '775054517745221652'
        },
        eve: {
            wts: '640757185789296640',
            wtb: '640760352614645790',
            wtr: '722215789955907858',
            wtro: '722215765889122335'
        },
        hawk: {
            wts: '640758024700428298',
            wtb: '640760659012747264',
            wtr: '722216593697931304',
            wtro: '722216571136901310'
        },
        hayha: {
            wts: '701611965251846214',
            wtb: '701612120684626008',
            wtr: '722216693048541194',
            wtro: '722216670613078099'
        },
        kodai: {
            wts: '640758065729372180',
            wtb: '640760714562109440',
            wtr: '722216890004406312',
            wtro: '722216848183263263'
        },
        mek: {
            wts: '640758098650464287',
            wtb: '640760750549499944',
            wtr: '722217031415627826',
            wtro: '722217009760174170'
        },
        phantom: {
            wts: '640758257593352192',
            wtb: '640760786867716116',
            wtr: '722217122402664449',
            wtro: '722217099711348837'
        },
        polaris: {
            wts: '701613408423772261',
            wtb: '701613439633719316',
            wtr: '722217263138078761',
            wtro: '722217205173059604'
        },
        pd: {
            wts: '640758205592371201',
            wtb: '640760881290018816',
            wtr: '722217375457345648',
            wtro: '722217353739501568'
        },
        scottbot: {
            wts: '701614033857544212',
            wtb: '701614060516409425',
            wtr: '722217558824190002',
            wtro: '722217532102148148'
        },
        sole: {
            wts: '640758449327570944',
            wtb: '640760951968235533',
            wtr: '722217720350900296',
            wtro: '722217699521855506'
        },
        tohru: {
            wts: '762907336859189257',
            wtb: '762907251992166410',
            wtr: '762906987658084362',
            wtro: '762907144055554068'
        },
        velox: {
            wts: '640758618681114624',
            wtb: '640761046000467968',
            wtr: '762936750213300234',
            wtro: '762936811122196490'
        },
        wrath: {
            wts: '640758679632871425',
            wtb: '640761077663006730',
            wtr: '722217822473945179',
            wtro: '722217803981127691'
        },
        other: {
            wts: '640759527465156618',
            wtb: '640761115353284608',
            wtr: '722217916006793298',
            wtro: '722217889775747105',
        }
    },
    botmart: {
        adept: {
            wts: '',
            wtb: '',
            wtr: '',
            wtro: ''
        },
        balko: {
            wts: '',
            wtb: '',
            wtr: '',
            wtro: ''
        },
        cyber: {
            wts: '',
            wtb: '',
            wtr: '',
            wtro: ''
        },
        dashe: {
            wts: '',
            wtb: '',
            wtr: '',
            wtro: ''
        },
        estock: {
            wts: '',
            wtb: '',
            wtr: '',
            wtro: ''
        },
        eve: {
            wts: '',
            wtb: '',
            wtr: '',
            wtro: ''
        },
        hawk: {
            wts: '',
            wtb: '',
            wtr: '',
            wtro: ''
        },
        hayha: {
            wts: '',
            wtb: '',
            wtr: '',
            wtro: ''
        },
        kodai: {
            wts: '',
            wtb: '',
            wtr: '',
            wtro: ''
        },
        mek: {
            wts: '',
            wtb: '',
            wtr: '',
            wtro: ''
        },
        phantom: {
            wts: '',
            wtb: '',
            wtr: '',
            wtro: ''
        },
        polaris: {
            wts: '',
            wtb: '',
            wtr: '',
            wtro: ''
        },
        pd: {
            wts: '',
            wtb: '',
            wtr: '',
            wtro: ''
        },
        scottbot: {
            wts: '',
            wtb: '',
            wtr: '',
            wtro: ''
        },
        sole: {
            wts: '',
            wtb: '',
            wtr: '',
            wtro: ''
        },
        tohru: {
            wts: '',
            wtb: '',
            wtr: '',
            wtro: ''
        },
        velox: {
            wts: '',
            wtb: '',
            wtr: '',
            wtro: ''
        },
        wrath: {
            wts: '',
            wtb: '',
            wtr: '',
            wtro: ''
        },
        other: {
            wts: '',
            wtb: '',
            wtr: '',
            wtro: '',
            wtr: '',
            wtro: ''
        }
    }, 
    tidal: {
        adept: {
            wts: '',
            wtb: '',
            wtr: '',
            wtro: ''
        },
        balko: {
            wts: '',
            wtb: '',
            wtr: '',
            wtro: ''
        },
        cyber: {
            wts: '',
            wtb: '',
            wtr: '',
            wtro: ''
        },
        dashe: {
            wts: '',
            wtb: '',
            wtr: '',
            wtro: ''
        },
        estock: {
            wts: '',
            wtb: '',
            wtr: '',
            wtro: ''
        },
        eve: {
            wts: '',
            wtb: '',
            wtr: '',
            wtro: ''
        },
        hawk: {
            wts: '',
            wtb: '',
            wtr: '',
            wtro: ''
        },
        hayha: {
            wts: '',
            wtb: '',
            wtr: '',
            wtro: ''
        },
        kodai: {
            wts: '',
            wtb: '',
            wtr: '',
            wtro: ''
        },
        mek: {
            wts: '',
            wtb: '',
            wtr: '',
            wtro: ''
        },
        phantom: {
            wts: '',
            wtb: '',
            wtr: '',
            wtro: ''
        },
        polaris: {
            wts: '',
            wtb: '',
            wtr: '',
            wtro: ''
        },
        pd: {
            wts: '',
            wtb: '',
            wtr: '',
            wtro: ''
        },
        scottbot: {
            wts: '',
            wtb: '',
            wtr: '',
            wtro: ''
        },
        sole: {
            wts: '',
            wtb: '',
            wtr: '',
            wtro: ''
        },
        tohru: {
            wts: '',
            wtb: '',
            wtr: '',
            wtro: ''
        },
        velox: {
            wts: '',
            wtb: '',
            wtr: '',
            wtro: ''
        },
        wrath: {
            wts: '',
            wtb: '',
            wtr: '',
            wtro: ''
        },
        other: {
            wts: '',
            wtb: '',
            wtr: '',
            wtro: '',
            wtr: '',
            wtro: ''
        }
    },
    didi: {
        adept: {
            wts: '',
            wtb: '',
            wtr: '',
            wtro: ''
        },
        balko: {
            wts: '',
            wtb: '',
            wtr: '',
            wtro: ''
        },
        cyber: {
            wts: '',
            wtb: '',
            wtr: '',
            wtro: ''
        },
        dashe: {
            wts: '',
            wtb: '',
            wtr: '',
            wtro: ''
        },
        estock: {
            wts: '',
            wtb: '',
            wtr: '',
            wtro: ''
        },
        eve: {
            wts: '',
            wtb: '',
            wtr: '',
            wtro: ''
        },
        hawk: {
            wts: '',
            wtb: '',
            wtr: '',
            wtro: ''
        },
        hayha: {
            wts: '',
            wtb: '',
            wtr: '',
            wtro: ''
        },
        kodai: {
            wts: '',
            wtb: '',
            wtr: '',
            wtro: ''
        },
        mek: {
            wts: '',
            wtb: '',
            wtr: '',
            wtro: ''
        },
        phantom: {
            wts: '',
            wtb: '',
            wtr: '',
            wtro: ''
        },
        polaris: {
            wts: '',
            wtb: '',
            wtr: '',
            wtro: ''
        },
        pd: {
            wts: '',
            wtb: '',
            wtr: '',
            wtro: ''
        },
        scottbot: {
            wts: '',
            wtb: '',
            wtr: '',
            wtro: ''
        },
        sole: {
            wts: '',
            wtb: '',
            wtr: '',
            wtro: ''
        },
        tohru: {
            wts: '',
            wtb: '',
            wtr: '',
            wtro: ''
        },
        velox: {
            wts: '',
            wtb: '',
            wtr: '',
            wtro: ''
        },
        wrath: {
            wts: '',
            wtb: '',
            wtr: '',
            wtro: ''
        },
        other: {
            wts: '',
            wtb: '',
            wtr: '',
            wtro: '',
            wtr: '',
            wtro: ''
        }
    },
    tiger: {
        adept: {
            wts: '',
            wtb: '',
            wtr: '',
            wtro: ''
        },
        balko: {
            wts: '',
            wtb: '',
            wtr: '',
            wtro: ''
        },
        cyber: {
            wts: '',
            wtb: '',
            wtr: '',
            wtro: ''
        },
        dashe: {
            wts: '',
            wtb: '',
            wtr: '',
            wtro: ''
        },
        estock: {
            wts: '',
            wtb: '',
            wtr: '',
            wtro: ''
        },
        eve: {
            wts: '',
            wtb: '',
            wtr: '',
            wtro: ''
        },
        hawk: {
            wts: '',
            wtb: '',
            wtr: '',
            wtro: ''
        },
        hayha: {
            wts: '',
            wtb: '',
            wtr: '',
            wtro: ''
        },
        kodai: {
            wts: '',
            wtb: '',
            wtr: '',
            wtro: ''
        },
        mek: {
            wts: '',
            wtb: '',
            wtr: '',
            wtro: ''
        },
        phantom: {
            wts: '',
            wtb: '',
            wtr: '',
            wtro: ''
        },
        polaris: {
            wts: '',
            wtb: '',
            wtr: '',
            wtro: ''
        },
        pd: {
            wts: '',
            wtb: '',
            wtr: '',
            wtro: ''
        },
        scottbot: {
            wts: '',
            wtb: '',
            wtr: '',
            wtro: ''
        },
        sole: {
            wts: '',
            wtb: '',
            wtr: '',
            wtro: ''
        },
        tohru: {
            wts: '',
            wtb: '',
            wtr: '',
            wtro: ''
        },
        velox: {
            wts: '',
            wtb: '',
            wtr: '',
            wtro: ''
        },
        wrath: {
            wts: '',
            wtb: '',
            wtr: '',
            wtro: ''
        },
        other: {
            wts: '',
            wtb: '',
            wtr: '',
            wtro: '',
            wtr: '',
            wtro: ''
        }
    }
}

//group = botmart || tidal || mrkt || didi || tiger
//bot = one of the bots
//type = wts || wtb || wtr || wtro
//content = message content
const postListing = (message, market, bot, type) => {
    var options = {
        method: 'POST',
        url: `https://discord.com/api/v8/channels/${channels[market][bot][type]}/messages`,
        headers: {
            authority: 'discord.com',
            pragma: 'no-cache',
            'cache-control': 'no-cache',
            authorization: token,
            'accept-language': 'en-US',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.193 Safari/537.36',
            'content-type': 'application/json',
            accept: '*/*',
            origin: 'https://discord.com',
            'sec-fetch-site': 'same-origin',
            'sec-fetch-mode': 'cors',
            'sec-fetch-dest': 'empty',
            referer: `https://discord.com/channels/${groups[market]}/${channels[market][bot][type]}`,
            dnt: '1'
        },
        body: {content: message, nonce: randomstring.generate({length: 18, charset: '1234567890'}), tts: false},
        json: true
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
    });
}

const getListings = (market, bot, type, number) => {
    var options = {
        method: 'GET',
        url: `https://discord.com/api/v8/channels/${channels[market][bot][type]}/messages`,
        qs: {limit: number},
        headers: {
            authority: 'discord.com',
            pragma: 'no-cache',
            'cache-control': 'no-cache',
            authorization: token,
            'accept-language': 'en-US',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.193 Safari/537.36',
            accept: '*/*',
            'sec-fetch-site': 'same-origin',
            'sec-fetch-mode': 'cors',
            'sec-fetch-dest': 'empty',
            referer: `https://discord.com/channels/${groups[market]}/${channels[market][bot][type]}`,
            dnt: '1'
        }
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        const prices = [];
        for(const listing of JSON.parse(body)) {
            try {
                const content = listing.content.toLowerCase();

                if(content.includes(type) && (content.includes('£') || content.includes('$') || content.includes('€'))) {
                    console.log('valid listing')
                    for(const word of content.split(' ')) {
                        console.log('split words')
                        if(word.includes('$')) {
                            console.log('dollar')
                            for(const part of word.split('$')) {
                                if(part !== '') {
                                    console.log('final', part)
                                    if(Number(part) !== NaN) {
                                        prices.push(Number(part))
                                    }
                                    
                                }
                            }
                        }else if(word.includes('£')) {
                            for(const part of word.split('£')) {
                                if(part !== '') {
                                    if(Number(part) !== NaN) {
                                        prices.push(Number(part) * 0.76)
                                    }
                                    
                                }
                            }
                        }else if(word.includes('€')) {
                            for(const part of word.split('£')) {
                                if(part !== '') {
                                    if(Number(part) !== NaN) {
                                        prices.push(Number(part) * 0.84)
                                    }
                                }
                            }
                        }
                    }
                }else {
                    console.log('skipping')
                }
            }catch(err) {
                console.log('skipping listing!')
            }
        }
        console.log(prices)
        return prices;
    });
}


//todo: just clean up requests, left off fixing the 404 error
const monitor = (bot, lowprice, highprice, message) => {
    let last = 0;
    var options = {
        method: 'GET',
        url: `https://discord.com/api/v8/channels/772585244036431873/messages`,
        qs: {limit: 1},
        headers: {
            authority: 'discord.com',
            pragma: 'no-cache',
            'cache-control': 'no-cache',
            authorization: token,
            'accept-language': 'en-US',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.193 Safari/537.36',
            accept: '*/*',
            'sec-fetch-site': 'same-origin',
            'sec-fetch-mode': 'cors',
            'sec-fetch-dest': 'empty',
            referer: `https://discord.com/channels/536693090186952704/772585244036431873`,
            dnt: '1'
        }
    };
    request(options, function(error, response, body) {
        console.log(body)
        const message = JSON.parse(body)[0];
        if(message.author.id !== last) {
            console.log('new message!')
            last = message.author.id;
            console.log(message.author.id)
            dmUser(message.author.id, 'hey! i wtb rush', 'https://discord.com/channels/536693090186952704/772585244036431873')
        }
    })
}

const dmUser = (id, message) => {
    const options = { 
        method: 'POST',
        url: `https://discord.com/api/v8/users/@me/channels`,
        headers: {
            authority: 'discord.com',
            pragma: 'no-cache',
            'cache-control': 'no-cache',
            authorization: token,
            'accept-language': 'en-US',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.193 Safari/537.36',
            'content-type': 'application/json',
            accept: '*/*',
            origin: 'https://discord.com',
            'sec-fetch-site': 'same-origin',
            'sec-fetch-mode': 'cors',
            'sec-fetch-dest': 'empty',
            dnt: '1'
        },
        body: {recipients: ["701826342483656756"]},
        json: true
    }
    request(options, function(error, response, body) {
        console.log('getting dm id')
        if(error) throw new Error(error);
        console.log(body)
        const options2 = { 
            method: 'POST',
            url: `https://discord.com/api/v8/channels/${JSON.parse(body).id}/messages`,
            headers: {
                authority: 'discord.com',
                pragma: 'no-cache',
                'cache-control': 'no-cache',
                authorization: token,
                'accept-language': 'en-US',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.193 Safari/537.36',
                'content-type': 'application/json',
                accept: '*/*',
                origin: 'https://discord.com',
                'sec-fetch-site': 'same-origin',
                'sec-fetch-mode': 'cors',
                'sec-fetch-dest': 'empty',
                referer: `https://discord.com/channels/@me/${JSON.parse(body).id}`,
                dnt: '1'
            },
            body: {recipients: [id]},
            json: true
        };

        request(options2, function(error, response, body) {
            if(error) throw new Error(error);

            console.log(body);
        })

    })
}
//getListings('mrkt', 'cyber', 'wts', 100);

monitor('rush', 1900, 2100, 'i wtb rush');

module.exports = {
    getListings: getListings
}