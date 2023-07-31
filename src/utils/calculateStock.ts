'use strict';

module.exports = function (transaction: Transaction, stockLevel: number): number {
    if (transaction.type === 'order') {
        return stockLevel - transaction.qty;
    }
    return stockLevel + transaction.qty;
}