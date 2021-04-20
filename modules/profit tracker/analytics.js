const inventory = require('./inventory')
const expenses = require('./expenses')

let totalprofit = 0,
    totalSoldShoes = 0,
    totalBots = 0,
    totalinventory = 0,
    totalUnrealized = 0;

const getTotals = async () => {
    let inventoryArrs = inventory.returnInventory()
    let expensesArrs = expenses.returnExpenses()
    inventoryArrs.sold.forEach(element => {
        totalprofit = totalprofit + element['profit']
    });
    totalSoldShoes = inventoryArrs.sold.length
    totalBots = expensesArrs.bots.length
    totalinventory = inventoryArrs.inventory.length
    inventoryArrs.inventory.forEach(element => {
        totalUnrealized = totalUnrealized + element['unrealized']
    })
}



