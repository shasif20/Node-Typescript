'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const fs = require('fs').promises;
const calculateStock = require('./calculateStock');
function parseFileData(fileName) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield fs.readFile(`${__dirname}/../data/${fileName}`);
            return JSON.parse(data);
        }
        catch (err) {
            throw err;
        }
    });
}
module.exports = function getStockLevel(sku) {
    return __awaiter(this, void 0, void 0, function* () {
        let stockLevels = null;
        // Find the initial quantity for Item
        const items = yield parseFileData('stock.json');
        for (const item of items) {
            if (item.sku === sku) {
                stockLevels = item.stock;
                break;
            }
        }
        // Calculate current stock based on transactions
        const transactions = yield parseFileData('transactions.json');
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
    });
};
//# sourceMappingURL=getStockLevel.js.map