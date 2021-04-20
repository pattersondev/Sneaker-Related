const stockxapi = require('stockx-api')
const stockx = new stockxapi()
const uuid = require('uuid')

let inventory = new Array();
let selected = new Array();
let sold = new Array();


//this function is called like inventory.push(addItem(all the shit)) outside of all functions
const addItem = async (name, itemSize, price, store, date, order) => {
    stockx.newSearchProducts(name, {
        limit: 10
    }).then(products => {
        stockx.fetchProductDetails(`https://stockx.com/${products[0].url}`)
        .then(product => {
            let realName = product.name
            product.variants.forEach(size => {
                if(size.size === itemSize || size.size.split('W')[0] === itemSize) {
                    return {
                        'id': uuid.v4(),
                        'name': realName,
                        'size': itemSize,
                        'profit': price - (2*price),
                        'unrealized': size.market.lastSale - price,
                        'market': size.market.lastSale,
                        'store': store,
                        'order': order,
                        'date': date
                    }
                }
            })
        })
        .catch(err => reject(err))
    })
    .catch(err => reject(err))
}


//this function is called like sold.push(await markAsSold(all the shit)) outside of all functions
const markAsSold = async (uuid, price, fee, shipping, platform) => {
    for(let item in inventory) {
        if(item['id'] === uuid) {
            inventory.splice(inventory.findIndex(item))
            return {
                'id': uuid,
                'name': item.name,
                'size': item.size,
                'profit': price - item.price - fee - shipping,
                'fee': fee,
                'shipping': shipping,
                'platform': platform
            }
        }
    }
}


const returnInventory = () => {
    return {
        inventory,
        sold
    }
}



module.exports = {
    returnInventory: returnInventory()
}




