'use strict';
module.exports = function (transaction, stockLevel) {
    if (transaction.type === 'order') {
        return stockLevel - transaction.qty;
    }
    return stockLevel + transaction.qty;
};
//# sourceMappingURL=calculateStock.js.map