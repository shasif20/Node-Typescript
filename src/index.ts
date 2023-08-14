const getStockLevel = require('./services/getStockLevel');

(async () => {
    try {
        const stockLevel = await getStockLevel('CLQ274846/07/46');
        console.log(stockLevel);
    } catch (err) {
        console.log(err);
    }
})();