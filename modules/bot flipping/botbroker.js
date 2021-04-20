const request = require('request');
const base = 'https://api.botbroker.io/api/v2';
const botIDs = {
    cyber: '1',
    polaris: '2',
    nebula: '3',
    mekaio: '4',
    balko: '5',
    dashe: '6',
    wrath: '7',
    splash: '8',
    pd: '9',
    tohru: '10',
    prism: '11',
    mekpreme: '12',
    sole: '13',
    adept: '14',
    phantom: '15',
    velox: '16',
    scottbot: '17',
    swft: '18'
};
const apikey = '';

const getLowestAsk = (bot, type) => {
    const options = {
        method: 'GET',
        url: `${base}/asks`,
        qs: {
            product_id: botIDs[bot],
            sort_by: 'price',
            order: 'asc',
            key_type: type
        },
        headers: {
            'x-api-key': apikey
        }
    };

    request(options, function(error, response, body) {
        let lowAsk = body.asks[0].price
    })
}

const getHighestBid = (bot, type) => {
    const options = {
        method: 'GET',
        url: `${base}/bids`,
        qs: {
            product_id: botIDs[bot],
            sort_by: 'price',
            order: 'desc',
            key_type: type
        },
        headers: {
            'x-api-key': apikey
        }
    };

    request(options, function(error, response, body) {
        let highBid = body.asks[0].price
    })
}

const getSales = (bot, type) => {
    const options = {
        method: 'GET',
        url: `${base}/sales/chart`,
        qs: {
            product_id: botIDs[bot],
            days: 30,
            key_type: type,
        },
        headers: {
            'x-api-key': apikey
        }
    };

    request(options, function(error, response, body) {
        let highBid = body.asks[0].price
    })
}

module.exports = {
    getHighestBid: getHighestBid(bot, type)
};