'use strict';
const calculateStock = require('./calculateStock');
const parseFileData = require('../utils/parseFileData');

module.exports = async function getStockLevel(sku: string): Promise<Result> {
    let stockLevels: number | null = null;

    // Find the initial quantity for Item
    const items: StockItem[] = await parseFileData('stock.json') as StockItem[];
    for (const item of items) {
        if (item.sku === sku) {
            stockLevels = item.stock;
            break;
        }
    }

    // Calculate current stock based on transactions
    const transactions: Transaction[] = await parseFileData('transactions.json') as Transaction[];
    for (const transaction of transactions) {
        if (transaction.sku === sku) {
            // in case, record is not found in stock.json, then assume 0 as initial quantity
            stockLevels = calculateStock(transaction, stockLevels || 0);
        }
    }

    if (stockLevels === null) {
        throw new Error('Invalid SKU');
    }

    return { sku, qty: stockLevels };
}