let expenses = new Array();
let bots = new Array();


//called like expenses.push(await addexpense())
const addExpense = async (name, price, site, date, qty, order) => {
    return {
        'name': name,
        'price': price,
        'place': site,
        'date': date,
        'qty': qty,
        'orderID': order
    }
}


const addBot = async (name, key, price, renewal, renewLength, renewPrice, firstRenew) => {
    if(renewal) {
        return {
            'name': name,
            'key': key,
            'price': price,
            'renewDate': renewDate,
            'renewPrice': renewPrice,
            'firstRenew': firstRenew
        }
    }else {
        return {
            'name': name,
            'key': key,
            'price': price
        }
    }
    
}


const returnExpenses = () => {
    return {
        expenses,
        bots
    }
}


module.exports = {
    returnExpenses: returnExpenses()
}


