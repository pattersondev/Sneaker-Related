const inventory = [];
const botbroker = require('modules\\bot flipping\\botbroker.js')
const discord = require('modules\\bot flipping\\autopost.js')
/*
    NAMES ARE:
    cyber (bb)
    tohru (bb)
    mekpreme (bb)
    mekaio (bb)
    balko (bb)
    nebula (bb)
    polaris (bb)
    dashe (bb)
    wrath (bb)
    splashforce (bb)
    pd (bb)
    prism (bb)
    phantom (bb)
    velox (bb)
    scottbot (bb)
    swft (bb)
    zeny
    burst
    estock
    eve
    f3
    flare
    fleek
    galaxs
    ganesh
    hawk
    hayha
    kodai
    kilo
    launcher
    mbot
    phasma
    reaio
    sole
    solyd
    sypion
    tks
    torpedo
    valor
*/
const addBot = async (name, buyprice, buy_date, renew_date, type) => {
    if(name === 'cyber' || name === 'tohru' || name === 'mekaio' || name === 'mekpreme' || name === 'balko' || name === 'nebula' || name === 'polaris' || name === 'splashforce' || name === 'pd' || name === 'prism' || name === 'phantom' || name === 'velox' || name === 'scottbot' || name === 'swft') {
        
    }
    const bot = {
        name: name,
        buy: buyprice,
        market: market,
        unrealized: market - buyprice
    }
}